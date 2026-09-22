/**
 * Shape of a single blog post on the Dev Insights Mini Blog.
 *
 * Named `BlogPost` (not `Post`) so it never clashes with the `Post` component.
 */
export interface BlogPost {
  /** Unique, stable identifier - used as the React `key` when rendering lists. */
  id: string;
  title: string;
  author: Author;
  /** Full body of the post. The list only shows a short preview of it. */
  content: string;
  /** ISO 8601 date string, e.g. "2026-09-18T09:30:00.000Z". */
  datePosted: string;
  tags: string[];
}

export interface Author {
  name: string;
  role: string;
}
