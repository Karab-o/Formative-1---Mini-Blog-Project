import styles from './Header.module.css';

/**
 * Site header with the text-based "Dev Insights" logo and main navigation.
 * The "New Post" link is a placeholder for now (not functional yet).
 */
function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <a href="/" className={styles.logo} aria-label="Dev Insights home">
          <span className={styles.logoMark} aria-hidden="true">
            {'</>'}
          </span>
          Dev <span className={styles.logoAccent}>Insights</span>
        </a>

        <nav aria-label="Main navigation">
          <a href="#new-post" className={styles.newPostLink}>
            + New Post
          </a>
        </nav>
      </div>
    </header>
  );
}

export default Header;
