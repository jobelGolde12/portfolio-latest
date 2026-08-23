'use client';

import { useState, useCallback, useMemo } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { Search, ArrowUpRight, Mail, FileText } from 'lucide-react';
import { GithubIcon, LinkedinIcon, FacebookIcon } from '@/components/Icons';
import { cn } from '@/lib/utils';

interface CommandItem {
  id: string;
  label: string;
  category: string;
  icon?: React.ReactNode;
  action: () => void;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [prevOpen, setPrevOpen] = useState(open);

  // Reset palette state whenever the dialog is (re)opened — "adjusting state during render"
  // (React 19 pattern; avoids setState-in-effect lint error).
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setQuery('');
      setSelectedIndex(0);
    }
  }

  const commands: CommandItem[] = useMemo(
    () => [
      // Sections
      { id: 'about', label: 'About', category: 'Sections', action: () => { document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
      { id: 'skills', label: 'Skills', category: 'Sections', action: () => { document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
      { id: 'projects', label: 'Projects', category: 'Sections', action: () => { document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
      { id: 'contact', label: 'Contact', category: 'Sections', action: () => { document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); onClose(); } },
      { id: 'blog', label: 'Visit the blog', category: 'Sections', action: () => { window.open('/blog', '_self'); onClose(); } },

      // Projects
      { id: 'proj-profanity', label: 'Profanity Detection API', category: 'Projects', action: () => { window.open('https://filipino-profanity-api-latest.vercel.app/', '_blank'); onClose(); } },
      { id: 'proj-lost', label: 'Lost and Found System', category: 'Projects', action: () => { window.open('https://github.com/jobelGolde12/bulan_lost_and_found3.git', '_blank'); onClose(); } },
      { id: 'proj-damayan', label: 'Protec Damayan', category: 'Projects', action: () => { window.open('https://github.com/jobelGolde12/damayan.git', '_blank'); onClose(); } },
      { id: 'proj-portal', label: 'School Portal', category: 'Projects', action: () => { window.open('https://github.com/jobelGolde12/school_portal.git', '_blank'); onClose(); } },

      // Actions
      { id: 'email', label: 'Copy email address', category: 'Actions', icon: <Mail className="w-4 h-4" />, action: () => { navigator.clipboard.writeText('jobelgolde45@gmail.com'); onClose(); } },
      { id: 'github', label: 'View GitHub profile', category: 'Actions', icon: <GithubIcon className="w-4 h-4" />, action: () => { window.open('https://github.com/jobelGolde12', '_blank'); onClose(); } },
      { id: 'linkedin', label: 'View LinkedIn profile', category: 'Actions', icon: <LinkedinIcon className="w-4 h-4" />, action: () => { window.open('https://www.linkedin.com/in/jobel-golde-6a8822411/', '_blank'); onClose(); } },
      { id: 'facebook', label: 'View Facebook profile', category: 'Actions', icon: <FacebookIcon className="w-4 h-4" />, action: () => { window.open('https://www.facebook.com/jobelGolde', '_blank'); onClose(); } },
      { id: 'resume', label: 'Download resume', category: 'Actions', icon: <FileText className="w-4 h-4" />, action: () => { window.open('/jobel-golde-resume.pdf', '_blank'); onClose(); } },
    ],
    [onClose],
  );

  const filtered = useMemo(() => {
    if (!query) return commands;
    const q = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q),
    );
  }, [query, commands]);

  // Group by category
  const grouped = useMemo(() => {
    const groups: { category: string; items: CommandItem[] }[] = [];
    const seen = new Set<string>();
    for (const item of filtered) {
      if (!seen.has(item.category)) {
        seen.add(item.category);
        groups.push({ category: item.category, items: filtered.filter((i) => i.category === item.category) });
      }
    }
    return groups;
  }, [filtered]);

  const flatItems = filtered;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.min(prev + 1, flatItems.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === 'Enter' && flatItems[selectedIndex]) {
        e.preventDefault();
        flatItems[selectedIndex].action();
      }
    },
    [flatItems, selectedIndex],
  );

  return (
    <Dialog open={open} onClose={onClose}>
      <div className="flex flex-col" onKeyDown={handleKeyDown}>
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-subtle">
          <Search className="w-4 h-4 text-text-tertiary shrink-0" aria-hidden />
          <label htmlFor="command-search" className="sr-only">
            Search sections, projects, actions
          </label>
          <input
            id="command-search"
            type="text"
            placeholder="Search sections, projects, actions..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-tertiary outline-none font-mono"
            autoFocus
          />
          <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono text-text-tertiary border border-border-subtle rounded">
            esc
          </kbd>
        </div>

        {/* Results */}
        <div className="max-h-[300px] overflow-y-auto p-2">
          {grouped.length === 0 ? (
            <p className="text-sm text-text-tertiary text-center py-8">No results found</p>
          ) : (
            grouped.map((group) => (
              <div key={group.category}>
                <p className="px-3 py-1.5 text-[11px] font-medium text-text-tertiary uppercase tracking-wider">
                  {group.category}
                </p>
                {group.items.map((item) => {
                  const globalIndex = flatItems.indexOf(item);
                  return (
                    <button
                      key={item.id}
                      onClick={item.action}
                      className={cn(
                        'w-full flex items-center gap-3 px-3 py-2.5 rounded-sm text-left text-sm transition-colors',
                        globalIndex === selectedIndex
                          ? 'bg-accent-soft text-text-primary'
                          : 'text-text-secondary hover:bg-bg-surface hover:text-text-primary',
                      )}
                    >
                      {item.icon || <ArrowUpRight className="w-4 h-4 text-text-tertiary" />}
                      <span className="flex-1">{item.label}</span>
                      <ArrowUpRight className="w-3 h-3 text-text-tertiary opacity-0 group-hover:opacity-100" />
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-border-subtle text-[11px] text-text-tertiary">
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[10px]">↑↓</kbd>
            navigate
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[10px]">↵</kbd>
            select
          </span>
          <span className="flex items-center gap-1">
            <kbd className="px-1 py-0.5 border border-border-subtle rounded text-[10px]">esc</kbd>
            close
          </span>
        </div>
      </div>
    </Dialog>
  );
}
