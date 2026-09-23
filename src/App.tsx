import Header from './components/Header/Header';
import PostList from './components/PostList/PostList';
import styles from './App.module.css';

/**
 * Root component: renders the site Header and the PostList.
 */
function App() {
  return (
    <div className={styles.app}>
      <Header />

      <main className={styles.main}>
        <PostList />
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} Dev Insights · Internal Mini Blog
      </footer>
    </div>
  );
}

export default App;
