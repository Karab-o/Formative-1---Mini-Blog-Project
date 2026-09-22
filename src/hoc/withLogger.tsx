import { useEffect, type ComponentType } from 'react';

/**
 * Higher-Order Component that logs to the console when the wrapped
 * component mounts and unmounts.
 *
 * Usage:
 *   const PostListWithLogger = withLogger(PostList);
 *
 * Note: in development, React.StrictMode mounts, unmounts and re-mounts
 * every component once on purpose, so you will see
 * "mounted -> unmounted -> mounted" on first load. This does not happen
 * in the production build.
 */
export function withLogger<P extends object>(
  WrappedComponent: ComponentType<P>,
  componentName?: string,
) {
  const name =
    componentName ?? WrappedComponent.displayName ?? WrappedComponent.name ?? 'Component';

  function WithLogger(props: P) {
    useEffect(() => {
      console.log(`[withLogger] <${name}> mounted`);

      // The cleanup function runs when the component unmounts.
      return () => {
        console.log(`[withLogger] <${name}> unmounted`);
      };
    }, []); // empty array = run only on mount / unmount, not on every render

    return <WrappedComponent {...props} />;
  }

  // Shows as "withLogger(PostList)" in React Developer Tools.
  WithLogger.displayName = `withLogger(${name})`;

  return WithLogger;
}
