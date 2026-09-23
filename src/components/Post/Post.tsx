import { memo } from 'react';
import type { BlogPost } from '../../types/post';
import { withLogger } from '../../hoc/withLogger';
import {
  formatDate,
  getAvatarColor,
  getInitials,
  getPreview,
  isWithinLast24Hours,
} from '../../utils/postUtils';
import styles from './Post.module.css';

export interface PostProps {
  post: BlogPost;
  /** When true, the card gets a highlighted background (featured author). */
  isHighlighted?: boolean;
}

/**
 * Renders a single blog post card: title, author, date and content preview.
 *
 * Functional component (not a class) - see README "Component type choice".
 */
function Post({ post, isHighlighted = false }: PostProps) {
  const { title, author, content, datePosted, tags } = post;
  const isNew = isWithinLast24Hours(datePosted);

  // Conditional styling #1: add the "highlighted" class for the featured author.
  const cardClassName = isHighlighted ? `${styles.card} ${styles.highlighted}` : styles.card;

  return (
    <article className={cardClassName} data-highlighted={isHighlighted}>
      <div className={styles.meta}>
        {/* Inline style: the avatar colour is calculated from the author's name at runtime. */}
        <span
          className={styles.avatar}
          style={{ backgroundColor: getAvatarColor(author.name) }}
          aria-hidden="true"
        >
          {getInitials(author.name)}
        </span>

        <div className={styles.authorInfo}>
          <span className={styles.authorName}>{author.name}</span>
          <span className={styles.authorRole}>{author.role}</span>
        </div>

        <time className={styles.date} dateTime={datePosted}>
          {formatDate(datePosted)}
        </time>
      </div>

      <h2 className={styles.title}>
        {title}
        {/* Conditional styling #2: "New!" badge only for posts from the last 24 hours. */}
        {isNew && <span className={styles.newBadge}>New!</span>}
      </h2>

      <p className={styles.preview}>{getPreview(content)}</p>

      <div className={styles.footer}>
        <ul className={styles.tags} aria-label="Tags">
          {tags.map((tag) => (
            <li key={tag} className={styles.tag}>
              #{tag}
            </li>
          ))}
        </ul>

        {isHighlighted && (
          <span className={styles.featuredLabel} style={{ fontStyle: 'italic' }}>
            ★ Featured author
          </span>
        )}
      </div>
    </article>
  );
}

/*
 * React.memo: the card only re-renders when its props (post, isHighlighted)
 * change. withLogger logs when each card mounts/unmounts, e.g. when the
 * author filter in PostList hides or shows it.
 */
export default memo(withLogger(Post, 'Post'));
