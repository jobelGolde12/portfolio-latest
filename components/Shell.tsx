'use client';

import { useState, useCallback } from 'react';
import ThemeProvider from '@/components/ThemeProvider';
import Navbar from '@/components/Navbar';
import DarkBackground from '@/components/DarkBackground';
import AnimatedBackground from '@/components/AnimatedBackground';
import CommandPalette from '@/components/CommandPalette';

export default function Shell({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);

  const openCommand = useCallback(() => setCommandOpen(true), []);
  const closeCommand = useCallback(() => setCommandOpen(false), []);

  return (
    <ThemeProvider>
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent-signal focus:text-white focus:rounded-lg focus:outline-none focus:shadow-lg"
      >
        Skip to main content
      </a>

      <DarkBackground />
      <AnimatedBackground />
      <Navbar onCommandPaletteOpen={openCommand} />
      <CommandPalette open={commandOpen} onClose={closeCommand} />
      <main id="main-content">{children}</main>
    </ThemeProvider>
  );
}
