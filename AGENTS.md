# Repository Guidelines

## Project Structure & Module Organization
This repository is a small Create React App application. Application code lives in `src/`, with the entry point in `src/index.js` and the main UI component in `src/App.js`. Component styles are colocated as CSS files such as `src/App.css` and `src/index.css`. Static assets and the HTML shell live in `public/`. Tests currently sit beside source files in `src/` using the `*.test.js` pattern, and shared test setup is in `src/setupTests.js`.

## Build, Test, and Development Commands
Run `npm start` to launch the local dev server at `http://localhost:3000` with hot reload. Run `npm test` to start the Jest watcher powered by React Testing Library. Run `npm run build` to create a production bundle in `build/`. Avoid `npm run eject` unless the team explicitly decides to own the full CRA toolchain config.

## Coding Style & Naming Conventions
Use functional React components and keep files in plain JavaScript unless the project is intentionally migrated. Match the existing style: 2-space indentation, single quotes, and semicolons. Name components in `PascalCase`, hooks in `camelCase` starting with `use`, and test files as `ComponentName.test.js`. Keep component-specific assets close to the component that uses them when practical.

## Testing Guidelines
Testing uses Jest with `@testing-library/react` and `@testing-library/jest-dom`. Prefer behavior-focused assertions such as visible text, roles, and user interactions over implementation details. Add or update tests for any UI change that affects rendering, events, or conditional states. Run `npm test -- --watchAll=false` for a single non-interactive pass before opening a PR.

## Commit & Pull Request Guidelines
The history currently starts with a single scaffold commit (`Initialize project using Create React App`), so follow concise imperative commit subjects such as `Add cart summary banner`. Keep commits focused on one change. Pull requests should include a short description, testing notes, linked issue if applicable, and screenshots for visible UI changes.

## Security & Configuration Tips
Do not commit secrets or environment-specific values. Treat `public/` as fully client-visible. If environment variables are introduced later, document them in `README.md` and expose only values intended for the browser.
