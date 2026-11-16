# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2.

## Authentication & authorization

The app talks to the `tms-rest` Spring Boot backend (stateless JWT). `REST_URL` lives in
`src/app/shared/utils/constants.ts`.

### Login flow

1. `/login` (`LoginComponent`) — template-driven form, `required` + `email` validators; the request
   is only sent when the form is valid, and the button is disabled while it is in flight. Visiting
   `/login` while already logged in redirects to `/core`.
2. `AuthenticationService.login()` calls `POST api/auth/login` with `{email, password}`. The response
   carries `accessToken` (1 h), `refreshToken` (7 days) and the full `user` profile.
3. Tokens and profile are kept in **sessionStorage** (`jwt`, `refresh_jwt`, `currentUser`), so the
   session ends when the tab is closed. The user's habilitation codes are loaded into
   `PermissionsService`.

### On every request

- `JwtInterceptor` adds `Authorization: Bearer <token>` to backend calls (except the public
  `api/auth/login`, `api/auth/refresh`, `/authentification`, `/monitoring`).
- On a 401 it calls `api/auth/refresh` once (concurrent 401s share that call) and retries. If the
  refresh fails, every waiting request errors out and the user is sent to `/login`.

### Authorization

- Backend (`SecurityConfig`) is the real enforcement: per-resource habilitation codes
  (`CODE` / `CODE_VIEW` / `_CREATE` / `_EDIT` / `_DELETE`), loaded from the DB on every request.
- Frontend only shapes the UI:
  - `AuthGuard` — logged in or redirect to `/login`.
  - `*hasPermission="['CODE']"` — shows an element only if the user has one of the codes.
  - `PermissionGuard` (`data.permissions`) and `RoleGuard` (`data.roles`, `USER` / `ADMIN` /
    habilitation codes) — available for routes.
- Frontend permissions are a snapshot taken at login; a change made by an admin shows in the UI
  after the user logs in again (the backend applies it immediately).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
