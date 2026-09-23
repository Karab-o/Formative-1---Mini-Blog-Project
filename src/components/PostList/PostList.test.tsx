import { fireEvent, render, screen } from '@testing-library/react';
import PostList, { SAMPLE_POSTS } from './PostList';

describe('<PostList />', () => {
  beforeEach(() => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders every sample post', () => {
    render(<PostList />);
    expect(screen.getAllByRole('article')).toHaveLength(SAMPLE_POSTS.length);
  });

  it('filters posts by author', () => {
    render(<PostList />);

    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: 'Kevin Mugisha' },
    });

    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: /vite feels so fast/i })).toBeInTheDocument();
  });

  it('logs mount and unmount through withLogger', () => {
    const logSpy = vi.mocked(console.log);
    const { unmount } = render(<PostList />);

    expect(logSpy).toHaveBeenCalledWith('[withLogger] <PostList> mounted');
    unmount();
    expect(logSpy).toHaveBeenCalledWith('[withLogger] <PostList> unmounted');
  });
});
