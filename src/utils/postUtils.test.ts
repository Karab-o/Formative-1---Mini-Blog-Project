import { getInitials, getPreview, isWithinLast24Hours } from './postUtils';

describe('getPreview', () => {
  it('returns short content unchanged', () => {
    expect(getPreview('Hello React world', 5)).toBe('Hello React world');
  });

  it('cuts long content to the word limit and adds an ellipsis', () => {
    expect(getPreview('one two three four five six', 3)).toBe('one two three…');
  });
});

describe('isWithinLast24Hours', () => {
  const now = new Date('2026-09-21T12:00:00.000Z').getTime();

  it('is true for a post from 2 hours ago', () => {
    expect(isWithinLast24Hours('2026-09-21T10:00:00.000Z', now)).toBe(true);
  });

  it('is false for a post from 2 days ago', () => {
    expect(isWithinLast24Hours('2026-09-19T12:00:00.000Z', now)).toBe(false);
  });

  it('is false for a date in the future', () => {
    expect(isWithinLast24Hours('2026-09-22T12:00:00.000Z', now)).toBe(false);
  });
});

describe('getInitials', () => {
  it('returns the first letter of the first two names', () => {
    expect(getInitials('Amina Uwase')).toBe('AU');
  });
});
