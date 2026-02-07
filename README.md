# Angular

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.2.

## Login Implementation

This application includes a JWT-based login system integrated with a Spring Boot backend.

### Features

- Reactive form-based login with validation
- JWT token authentication
- Automatic token attachment to HTTP requests via interceptor
- Route protection with AuthGuard
- Responsive UI using PrimeNG components

### Setup

1. Ensure your Spring Boot backend is running and exposes a `/auth/login` endpoint that accepts POST requests with `{email, password}` and returns `{token: string}`.

2. Update the `REST_URL` in `src/app/shared/services/api/authentication.service.ts` to point to your backend.

3. Install dependencies:
   ```
   npm install
   ```

4. Run the application:
   ```
   ng serve
   ```

### Usage

- Navigate to `/login` to access the login form.
- Enter valid email and password (min 6 characters).
- Upon successful login, the user is redirected to `/dashboard`.
- If already logged in, accessing `/login` redirects to `/dashboard`.
- All subsequent HTTP requests include the JWT token in the Authorization header.

### Components

- **LoginComponent**: Handles login form and validation.
- **AuthService**: Manages authentication logic, token storage, and login status.
- **TokenInterceptor**: Automatically attaches JWT token to requests (except login).
- **AuthGuard**: Protects routes requiring authentication.

### Troubleshooting

- **Build Errors**: Ensure all imports are correct and dependencies are installed.
- **Login Fails**: Check backend endpoint and response format. Verify `REST_URL` is correct.
- **Token Not Attached**: Confirm interceptor is added to `app.module.ts` providers.
- **Routing Issues**: Ensure routes are configured in `app-routing.module.ts`.

### Security Notes

- JWT tokens are stored in localStorage.
- Passwords are not stored locally.
- Tokens are sent with Bearer scheme in Authorization header.

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
