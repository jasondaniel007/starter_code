# Repository guide

## Build, test, and lint

The frontend and backend are separate npm projects; run commands from the matching directory.

### Frontend (`threadhive-frontend/`)

- `npm run dev` starts the Vite development server.
- `npm run build` creates the production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs ESLint across the frontend.

There is no frontend test script configured.

### Backend (`threadhive-backend/`)

- `npm run dev` starts the API with nodemon; `npm start` starts it with Node.
- `npm test` runs the Vitest suite.
- Run one test file with `npm test -- tests/unit/services/authService.test.js` (replace with the test path).
- Run tests matching a name with `npm test -- -t "test name"`.
- `npm run populate` runs the database population script.
- `npm run format` runs Prettier over the backend project.

## Architecture

ThreadHive is split into a React/Vite client and an Express/Mongoose API. The client declares its pages and protected routes in `threadhive-frontend/src/App.jsx`; page and component code calls feature services, which use the shared `fetchAPI` wrapper and endpoint constants in `src/config/apiConfig.js`. Authentication state is managed in `src/context/AuthContext.jsx`, with the token and user also persisted in browser local storage. The API base URL is currently configured in `src/api/apiClient.js`.

The backend starts in `main.js`, connects to MongoDB through `db.js`, and assembles middleware and `/api` routes in `src/app.js`. Feature routes delegate to controllers, controllers to services, and services to Mongoose models. Authentication is JWT-based: protected routes use `authHandler`, which sets `req.user`; errors flow through the shared error middleware. API success responses use a `{ success, message, data }` envelope, which frontend services unwrap by returning `response.data`.

## Repository conventions

- Backend code uses ES modules with explicit `.js` extensions in relative imports. Keep request routing, HTTP response handling, and persistence in their existing route/controller/service/model layers.
- Backend errors should use `createAppError(message, statusCode)` and flow to the shared error handler. Preserve the `{ success, message, data }` response shape and existing HTTP status conventions.
- Frontend endpoint paths belong in `src/config/apiConfig.js`; feature-specific request functions belong in `src/services/`. Use `fetchAPI` for requests so authorization headers and API errors stay consistent.
- Frontend route protection is handled by `PrivateRoute`; login/session data is stored through the auth context and local storage.
- Backend tests are Vitest tests under `tests/unit/` and `tests/integration/`. Integration tests use Supertest and the MongoDB memory-server setup in `tests/setup.js`; keep database-backed behavior covered at that layer and isolated service behavior in unit tests.
- The backend reads `MONGODB_URI`, `JWT_SECRET`, and optional `PORT` from its environment. The frontend API client currently targets `http://localhost:3000/api`; keep the local API and client URLs aligned when changing ports.
