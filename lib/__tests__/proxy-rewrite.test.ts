import { describe, it, expect } from 'vitest';
import { rewriteHtml } from '../proxy-rewrite';

const UPSTREAM = 'https://convert-py.vercel.app';
const PROXY = `/api/proxy?url=${encodeURIComponent(UPSTREAM)}`;

describe('rewriteHtml', () => {
  describe('attribute rewriting (src, href, poster, data-src, action)', () => {
    it('rewrites src="/foo" to proxy URL', () => {
      const input = '<img src="/images/logo.png">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<img src="${PROXY}/images/logo.png">`);
    });

    it('rewrites href="/style.css" to proxy URL', () => {
      const input = '<link href="/style.css">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<link href="${PROXY}/style.css">`);
    });

    it('rewrites poster="/video.mp4" to proxy URL', () => {
      const input = '<video poster="/thumb.jpg">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<video poster="${PROXY}/thumb.jpg">`);
    });

    it('rewrites data-src="/lazy.png" to proxy URL', () => {
      const input = '<img data-src="/lazy.png">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<img data-src="${PROXY}/lazy.png">`);
    });

    it('rewrites action="/submit" to proxy URL', () => {
      const input = '<form action="/submit">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<form action="${PROXY}/submit">`);
    });

    it('does not rewrite full URLs (https://...)', () => {
      const input = '<img src="https://cdn.example.com/img.png">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('rewrites relative paths without leading slash (style.css, app.js)', () => {
      const input = '<link rel="stylesheet" href="style.css">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<link rel="stylesheet" href="${PROXY}/style.css">`);
    });

    it('rewrites relative image paths', () => {
      const input = '<img src="images/logo.png">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<img src="${PROXY}/images/logo.png">`);
    });

    it('does not rewrite anchor links (#...)', () => {
      const input = '<a href="#section">Link</a>';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('does not rewrite mailto: links', () => {
      const input = '<a href="mailto:test@example.com">Email</a>';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('does not rewrite tel: links', () => {
      const input = '<a href="tel:+1234567890">Call</a>';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('does not rewrite javascript: links', () => {
      const input = '<a href="javascript:void(0)">Click</a>';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('does not rewrite data: URIs', () => {
      const input = '<img src="data:image/png;base64,abc">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('does not rewrite empty src', () => {
      const input = '<img src="">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('handles both single and double quotes', () => {
      const input = "<img src='/img.png'> <link href=\"/style.css\">";
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      // Preserves the original quote style
      expect(result).toContain(`src='${PROXY}/img.png'`);
      expect(result).toContain(`href="${PROXY}/style.css"`);
    });
  });

  describe('srcset rewriting', () => {
    it('rewrites srcset with absolute paths', () => {
      const input = '<img srcset="/img-300w.png 300w, /img-600w.png 600w">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(
        `<img srcset="${PROXY}/img-300w.png 300w, ${PROXY}/img-600w.png 600w">`,
      );
    });

    it('rewrites srcset with 1x/2x descriptors', () => {
      const input = '<img srcset="/img.png 1x, /img2.png 2x">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(
        `<img srcset="${PROXY}/img.png 1x, ${PROXY}/img2.png 2x">`,
      );
    });

    it('does not rewrite full URLs in srcset', () => {
      const input = '<img srcset="https://cdn.example.com/img.png 1x">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });
  });

  describe('url() in inline styles', () => {
    it('rewrites url("/bg.png") in style attribute', () => {
      const input = '<div style="background: url(/bg.png)">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<div style="background: url(${PROXY}/bg.png)">`);
    });

    it('rewrites url("/font.woff2") with quotes', () => {
      const input = "<div style=\"background: url('/font.woff2')\">";
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(
        `<div style="background: url('${PROXY}/font.woff2')">`,
      );
    });

    it('rewrites url() in <style> blocks', () => {
      const input = '<style>body { background: url(/bg.png); }</style>';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(
        `<style>body { background: url(${PROXY}/bg.png); }</style>`,
      );
    });
  });

  describe('absolute upstream URL rewriting', () => {
    it('rewrites absolute upstream URLs to proxy', () => {
      const input = `<img src="${UPSTREAM}/images/logo.png">`;
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<img src="${PROXY}/images/logo.png">`);
    });

    it('rewrites absolute upstream URLs in href', () => {
      const input = `<a href="${UPSTREAM}/about">About</a>`;
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<a href="${PROXY}/about">About</a>`);
    });
  });

  describe('edge cases', () => {
    it('handles empty HTML', () => {
      const result = rewriteHtml('', UPSTREAM, PROXY);
      expect(result).toBe('');
    });

    it('handles HTML with no URLs', () => {
      const input = '<p>Hello world</p>';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('handles multiple rewrites in one element', () => {
      const input = '<img src="/img.png" data-src="/lazy.png">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(
        `<img src="${PROXY}/img.png" data-src="${PROXY}/lazy.png">`,
      );
    });

    it('preserves non-URL attributes', () => {
      const input = '<div class="foo" id="bar" style="color: red">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(input);
    });

    it('handles path with query string', () => {
      const input = '<img src="/img.png?v=123">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<img src="${PROXY}/img.png?v=123">`);
    });

    it('handles deeply nested paths', () => {
      const input = '<img src="/a/b/c/d.png">';
      const result = rewriteHtml(input, UPSTREAM, PROXY);
      expect(result).toBe(`<img src="${PROXY}/a/b/c/d.png">`);
    });
  });
});
