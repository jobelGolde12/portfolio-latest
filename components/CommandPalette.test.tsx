import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommandPalette from './CommandPalette';

function renderPalette(open = true, onClose = vi.fn()) {
  return render(<CommandPalette open={open} onClose={onClose} />);
}

const SEARCH_PLACEHOLDER = 'Search sections, projects, actions...';

describe('CommandPalette', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('lists commands when open', () => {
    renderPalette();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Copy email address')).toBeInTheDocument();
  });

  it('filters commands by query', async () => {
    renderPalette();
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);
    await userEvent.type(input, 'github');

    expect(screen.getByText('View GitHub profile')).toBeInTheDocument();
    expect(screen.queryByText('About')).not.toBeInTheDocument();
  });

  it('shows an empty state when nothing matches', async () => {
    renderPalette();
    await userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'zzzzz');
    expect(screen.getByText('No results found')).toBeInTheDocument();
  });

  it('executes the selected command with Enter', () => {
    const onClose = vi.fn();
    renderPalette(true, onClose);
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    // First item is "About" — executing it scrolls (stubbed) and closes.
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onClose).toHaveBeenCalledTimes(1);

    // Arrow down moves to the second item; Enter still executes + closes.
    fireEvent.keyDown(input, { key: 'ArrowDown' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onClose).toHaveBeenCalledTimes(2);
  });

  it('navigates with arrow keys without wrapping past the list', () => {
    const onClose = vi.fn();
    renderPalette(true, onClose);
    const input = screen.getByPlaceholderText(SEARCH_PLACEHOLDER);

    // Arrow up on the first item stays on the first item (still executes About).
    fireEvent.keyDown(input, { key: 'ArrowUp' });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('opens the resume PDF from the resume command', async () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    const onClose = vi.fn();
    renderPalette(true, onClose);

    await userEvent.type(screen.getByPlaceholderText(SEARCH_PLACEHOLDER), 'resume');
    await userEvent.keyboard('{Enter}');

    expect(openSpy).toHaveBeenCalledWith('/jobel-golde-resume.pdf', '_blank');
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
