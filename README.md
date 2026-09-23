# Dev Insights Mini Blog

An internal blog where Dev Insights employees share quick web development tips and updates.
Built with **React + TypeScript** using **Vite** (set up manually, without a template), and styled with **CSS Modules** and **inline styles**.

## Installation

Requires Node.js 18 or newer.

```bash
git clone https://github.com/Karab-o/Formative-1---Mini-Blog-Project.git
cd Formative-1---Mini-Blog-Project
npm install
```

## Running the app

This project uses **Vite** as its dev server and build tool.

```bash
npm run dev
```

Open the URL Vite prints (usually <http://localhost:5173>). Open the browser console (F12) to see the `withLogger` messages.

## Testing

```bash
npm test
```

Runs the unit tests once with Vitest and React Testing Library. Other scripts: `npm run test:watch`, `npm run build` (type-check + production build), `npm run preview`.

## Project structure

```
index.html            # Vite entry page
vite.config.ts        # Vite + Vitest config
src/
  main.tsx            # Mounts <App />
  App.tsx             # Renders Header + PostList
  components/         # Header/, PostList/, Post/  (each with its .module.css and tests)
  hoc/withLogger.tsx  # Higher-Order Component
  types/post.ts       # BlogPost and Author interfaces
  utils/postUtils.ts  # Preview, date and avatar helpers
```

## Component types: functional vs. class

Every component, including the reusable `Post`, is a **functional component**:

- `Post` only renders its props, so it needs no state or lifecycle methods. A class would add boilerplate for no benefit.
- Hooks replace the lifecycle methods: `withLogger` uses `useEffect` with a cleanup function instead of `componentDidMount` and `componentWillUnmount`.
- `React.memo` gives the same re-render optimization as `PureComponent`, so no class is needed for performance.
- Functional components are the current React standard and are simpler to type with TypeScript.

## Styling

Two methods are used:

1. **CSS Modules** (external `*.module.css` files) for most styling. Class names are scoped automatically, so two components can both use `.title` without clashing. Vite supports them with no extra packages.
2. **Inline styles** only for values calculated at runtime: each author's avatar colour is generated from their name, so it cannot be written in a static CSS file.

**Conditional styling:** posts by the featured author get a `.highlighted` class (yellow background), and a green **"New!"** badge is rendered only when the post is less than 24 hours old.

## Optimization

- **`React.memo` on `Post`**: filtering by author re-renders `PostList`, but the cards that stay visible do not re-render because their props are unchanged.
- **Stable references**: the sample posts are declared outside the component, so `React.memo`'s shallow prop comparison actually passes.
- **Unique `key` props**: lists use `post.id`, never the array index.
- **`useMemo`**: the filtered list is recalculated only when the selected author changes.

## Higher-Order Component

`withLogger(Component)` wraps a component and logs when it mounts and unmounts:

```
[withLogger] <PostList> mounted
[withLogger] <Post> unmounted
```

It is applied to `Post` and `PostList`, so changing the author filter shows the unmount logs in the console.

## Challenges and how I solved them

1. **Setting up Vite without a template.** With no generated files to copy, I wasn't sure which files Vite actually needs. I worked through the Vite docs and found the minimum: `index.html` with `<div id="root">` and a `<script type="module" src="/src/main.tsx">` tag, `vite.config.ts` with the React plugin, and `tsconfig.json` with `jsx: "react-jsx"`.
2. **`npm run dev` failed with "'vite' is not recognized".** The error looked like a broken install of Vite, but had not installed the  dependencies in the project folder. Running `npm install` created `node_modules` and the command worked.
3. **The HOC logged "mounted, unmounted, mounted" on first load.** I thought my `useEffect` cleanup was wrong. It turned out to be `React.StrictMode`, which mounts components twice in development on purpose to show side-effect bugs. The production build logs each mount once.

## External libraries

| Package | Purpose |
| ------- | ------- |
| `react`, `react-dom` | UI library and DOM renderer |
| `vite`, `@vitejs/plugin-react` | Dev server, bundler and JSX transform |
| `typescript`, `@types/react`, `@types/react-dom` | Type checking and React types |
| `vitest`, `jsdom` | Test runner and browser-like test environment |
| `@testing-library/react`, `@testing-library/dom`, `@testing-library/jest-dom` | Rendering, querying and DOM matchers in tests |

No CSS framework or CSS-in-JS library is used.
