import { render, screen } from '@testing-library/react';
import type { BlogPost } from '../../types/post';
import Post from './Post';

const basePost: BlogPost = {
  id: 'test-1',
  title: 'Testing React Components',
  author: { name: 'Test Author', role: 'QA Engineer' },
  content: 'Some content about testing.',
  datePosted: '2020-01-15T10:00:00.000Z',
  tags: ['testing'],
};

describe('<Post />', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the title, author, preview and date', () => {
    render(<Post post={basePost} />);

    expect(screen.getByRole('heading', { name: /testing react components/i })).toBeInTheDocument();
    expect(screen.getByText('Test Author')).toBeInTheDocument();
    expect(screen.getByText('Some content about testing.')).toBeInTheDocument();
    expect(screen.getByText('15 Jan 2020')).toBeInTheDocument();
  });

  it('does not show the "New!" badge for old posts', () => {
    render(<Post post={basePost} />);
    expect(screen.queryByText('New!')).not.toBeInTheDocument();
  });

  it('shows the "New!" badge for posts from the last 24 hours', () => {
    const recentPost = { ...basePost, datePosted: new Date().toISOString() };
    render(<Post post={recentPost} />);
    expect(screen.getByText('New!')).toBeInTheDocument();
  });

  it('marks the card as highlighted when isHighlighted is true', () => {
    render(<Post post={basePost} isHighlighted />);
    expect(screen.getByRole('article')).toHaveAttribute('data-highlighted', 'true');
    expect(screen.getByText(/featured author/i)).toBeInTheDocument();
  });
});
