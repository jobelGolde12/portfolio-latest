export function formatDate(
  iso: string,
  opts: Intl.DateTimeFormatOptions = {},
) {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...opts,
  });
}
