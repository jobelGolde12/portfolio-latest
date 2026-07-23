'use client';

import { useState, useEffect, useCallback } from 'react';
import { cn } from '@/lib/utils';

interface TerminalCommand {
  command: string;
  output: string;
}

const commands: TerminalCommand[] = [
  { command: 'whoami', output: 'Jobel Golde — full-stack developer who builds systems that stay boring under load.' },
  { command: 'curl status', output: '● Available for new roles. Usually replies within a day.' },
];

export default function TerminalArtifact({ className }: { className?: string }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const typeText = useCallback(
    (text: string, onComplete: () => void) => {
      if (prefersReducedMotion) {
        setDisplayedText(text);
        onComplete();
        return;
      }

      let i = 0;
      setDisplayedText('');
      setIsTyping(true);

      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          clearInterval(interval);
          setIsTyping(false);
          onComplete();
        }
      }, 35);

      return () => clearInterval(interval);
    },
    [prefersReducedMotion],
  );

  useEffect(() => {
    if (prefersReducedMotion) {
      const fullText = commands.map((c) => `$ ${c.command}\n${c.output}`).join('\n\n');
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    let lineIndex = 0;

    const typeNextLine = () => {
      if (lineIndex >= commands.length) {
        setShowCursor(false);
        return;
      }

      const cmd = commands[lineIndex];
      const fullLine = `$ ${cmd.command}\n${cmd.output}`;

      typeText(fullLine, () => {
        lineIndex++;
        if (lineIndex < commands.length) {
          setTimeout(() => {
            setDisplayedText((prev) => prev + '\n\n');
            setTimeout(typeNextLine, 300);
          }, 800);
        } else {
          setShowCursor(false);
        }
      });
    };

    const timeout = setTimeout(typeNextLine, 600);
    return () => clearTimeout(timeout);
  }, [typeText, prefersReducedMotion]);

  return (
    <div
      className={cn(
        'rounded-lg border border-code-border bg-code-bg p-4 font-mono text-sm text-text-secondary overflow-hidden',
        className,
      )}
      role="region"
      aria-label="Interactive terminal"
      aria-live="polite"
    >
      {/* Terminal header */}
      <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-code-border">
        <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-warning/60" />
        <div className="w-2.5 h-2.5 rounded-full bg-success/60" />
        <span className="ml-2 text-xs text-text-tertiary">terminal</span>
      </div>

      {/* Terminal content */}
      <div className="min-h-[120px] whitespace-pre-wrap leading-relaxed">
        {displayedText || (
          <span className="text-text-tertiary">Loading...</span>
        )}
        {showCursor && (
          <span
            className={cn(
              'inline-block w-2 h-4 bg-accent-signal ml-0.5 align-middle',
              isTyping ? 'animate-pulse' : 'animate-signal-pulse',
            )}
            aria-hidden
          />
        )}
      </div>

      {/* Static fallback for screen readers */}
      <div className="sr-only">
        {commands.map((cmd) => (
          <div key={cmd.command}>
            <p>$ {cmd.command}</p>
            <p>{cmd.output}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
