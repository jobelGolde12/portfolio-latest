import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Dialog } from './dialog';

describe('Dialog', () => {
  it('renders children when open', () => {
    render(
      <Dialog open onClose={vi.fn()}>
        Dialog content
      </Dialog>,
    );
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog content')).toBeInTheDocument();
  });

  it('renders nothing when closed', () => {
    render(
      <Dialog open={false} onClose={vi.fn()}>
        Dialog content
      </Dialog>,
    );
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    expect(screen.queryByText('Dialog content')).not.toBeInTheDocument();
  });

  it('calls onClose on Escape', async () => {
    const onClose = vi.fn();
    render(
      <Dialog open onClose={onClose}>
        Dialog content
      </Dialog>,
    );
    await userEvent.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when the overlay wrapper is clicked', async () => {
    const onClose = vi.fn();
    const { container } = render(
      <Dialog open onClose={onClose}>
        Dialog content
      </Dialog>,
    );
    // The outermost motion.div closes when the click target is itself.
    await userEvent.click(container.firstChild as HTMLElement);
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
