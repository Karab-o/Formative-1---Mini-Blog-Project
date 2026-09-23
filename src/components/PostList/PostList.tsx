import { useMemo, useState, type ChangeEvent } from 'react';
import type { BlogPost } from '../../types/post';
import { withLogger } from '../../hoc/withLogger';
import Post from '../Post/Post';
import styles from './PostList.module.css';

/** Posts by this author are highlighted (conditional styling). */
export const FEATURED_AUTHOR = 'Amina Uwase';

const ALL_AUTHORS = 'all';

const HOURS_AGO_3 = new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString();

/**
 * Hardcoded sample posts (no backend yet).
 * Declared outside the component so the array and every post object keep
 * the same reference between renders - this is what lets React.memo on
 * <Post> skip re-renders.
 */
export const SAMPLE_POSTS: BlogPost[] = [
  {
    id: 'post-1',
    title: 'Stop Re-rendering Everything: A Practical Guide to React.memo',
    author: { name: 'Amina Uwase', role: 'Senior Frontend Engineer' },
    content:
      'React.memo wraps a component and skips re-rendering it when its props have not changed. It is most useful for list items and expensive components that receive the same props again and again. Remember that it only does a shallow comparison, so passing a new object or inline function on every render cancels out the benefit.',
    // Always "3 hours ago" so the New! badge can be demonstrated.
    datePosted: HOURS_AGO_3,
    tags: ['react', 'performance'],
  },
  {
    id: 'post-2',
    title: 'Why Vite Feels So Fast Compared to Older Bundlers',
    author: { name: 'Kevin Mugisha', role: 'Full-Stack Developer' },
    content:
      'During development Vite serves your source files as native ES modules, so the browser only requests the files it actually needs. Dependencies are pre-bundled once with esbuild, and hot module replacement updates just the module you edited instead of rebuilding the whole bundle.',
    datePosted: '2026-09-18T09:30:00.000Z',
    tags: ['vite', 'tooling'],
  },
  {
    id: 'post-3',
    title: 'Typing Props in TypeScript: Interfaces vs. Type Aliases',
    author: { name: 'Grace Ineza', role: 'UI Engineer' },
    content:
      'Both interfaces and type aliases can describe component props. Interfaces can be extended and merged, which makes them a good default for object shapes, while type aliases shine for unions and mapped types. Pick one convention for your team and use it consistently.',
    datePosted: '2026-09-10T14:00:00.000Z',
    tags: ['typescript', 'react'],
  },
];

const AUTHOR_NAMES = Array.from(new Set(SAMPLE_POSTS.map((post) => post.author.name)));

/**
 * Displays the list of blog posts with a simple author filter.
 */
function PostList() {
  const [selectedAuthor, setSelectedAuthor] = useState<string>(ALL_AUTHORS);

  // Only recalculate the filtered list when the selected author changes.
  const visiblePosts = useMemo(
    () =>
      selectedAuthor === ALL_AUTHORS
        ? SAMPLE_POSTS
        : SAMPLE_POSTS.filter((post) => post.author.name === selectedAuthor),
    [selectedAuthor],
  );

  function handleAuthorChange(event: ChangeEvent<HTMLSelectElement>) {
    setSelectedAuthor(event.target.value);
  }

  return (
    <section className={styles.section} aria-labelledby="latest-posts-heading">
      <div className={styles.toolbar}>
        <h1 id="latest-posts-heading" className={styles.heading}>
          Latest Insights
        </h1>

        <label className={styles.filter}>
          <span className={styles.filterLabel}>Author</span>
          <select
            className={styles.select}
            value={selectedAuthor}
            onChange={handleAuthorChange}
          >
            <option value={ALL_AUTHORS}>All authors</option>
            {AUTHOR_NAMES.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className={styles.count}>
        Showing {visiblePosts.length} of {SAMPLE_POSTS.length} posts
      </p>

      <ul className={styles.list}>
        {visiblePosts.map((post) => (
          // Unique, stable `key` (the post id) - never the array index.
          <li key={post.id}>
            <Post post={post} isHighlighted={post.author.name === FEATURED_AUTHOR} />
          </li>
        ))}
      </ul>
    </section>
  );
}

export default withLogger(PostList, 'PostList');
