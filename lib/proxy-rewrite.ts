/**
 * HTML rewriting for the proxy route.
 *
 * Rewrites relative URLs in HTML so that CSS, JS, images, and other
 * assets load through the proxy instead of directly from the upstream.
 * This ensures the proxied page renders fully inside the iframe.
 */

/**
 * Rewrite relative URLs in HTML so assets load through the proxy.
 *
 * Handles:
 * - src, href, poster, data-src, action attributes
 *   - Absolute paths (/foo)
 *   - Relative paths (style.css, app.js) — but NOT anchors (#), mailto:, tel:, javascript:
 * - srcset attributes (each URL rewritten individually)
 * - url() values in inline styles
 * - Absolute upstream URLs rewritten to proxy URLs
 */
export function rewriteHtml(
  html: string,
  upstreamOrigin: string,
  proxyBase: string,
): string {
  // 1. Rewrite attribute values: src="...", href="...", poster="...", data-src="..."
  //    Catches absolute paths (/foo) and relative paths (style.css),
  //    but skips anchors (#), mailto:, tel:, javascript:, and full URLs.
  const attrPattern =
    /((?:src|href|poster|data-src|action)\s*=\s*)(["'])([^"'\s#]+?)\2/gi;
  html = html.replace(
    attrPattern,
    (_match, prefix: string, quote: string, path: string) => {
      // Skip special schemes and full URLs
      if (/^(https?:\/\/|data:|blob:|mailto:|tel:|javascript:)/.test(path)) {
        return `${prefix}${quote}${path}${quote}`;
      }
      // Absolute paths: /foo → proxyBase/foo
      if (path.startsWith('/')) {
        return `${prefix}${quote}${proxyBase}${path}${quote}`;
      }
      // Relative paths: style.css → proxyBase/style.css
      return `${prefix}${quote}${proxyBase}/${path}${quote}`;
    },
  );

  // 2. Rewrite srcset attributes: /foo.png 1x, /bar.png 2x
  const srcsetPattern = /(srcset\s*=\s*)(["'])([^"']*?)\2/gi;
  html = html.replace(
    srcsetPattern,
    (_match, prefix: string, quote: string, value: string) => {
      const rewritten = value
        .split(',')
        .map((entry: string) => {
          const parts = entry.trim().split(/\s+/);
          if (parts[0] && parts[0].startsWith('/')) {
            parts[0] = `${proxyBase}${parts[0]}`;
          }
          return parts.join(' ');
        })
        .join(', ');
      return `${prefix}${quote}${rewritten}${quote}`;
    },
  );

  // 3. Rewrite url() in inline <style> blocks
  const urlPattern = /(url\s*\(\s*)(["']?)(\/[^)"']*)\2(\))/gi;
  html = html.replace(
    urlPattern,
    (_match, prefix: string, quote: string, path: string, suffix: string) =>
      `${prefix}${quote}${proxyBase}${path}${quote}${suffix}`,
  );

  // 4. Rewrite absolute upstream URLs (https://convert-py.vercel.app/foo)
  //    to proxy URLs so they also go through the proxy
  const escapedOrigin = upstreamOrigin.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const absPattern = new RegExp(
    `(=["']|url\\(\\s*["']?)(${escapedOrigin})(\\/[^"')\\s]*)`,
    'gi',
  );
  html = html.replace(
    absPattern,
    (_match, prefix: string, _origin: string, path: string) =>
      `${prefix}${proxyBase}${path}`,
  );

  return html;
}
