# Secure Angular configuration/credentials in containerized environment

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.0.7.

## Goals
Separating and securing configuration (or anything likely to vary between deployment environments) from source code will enable us to:

- Build once, deploy everywhere: strictly separate stages into build-release-run results in fast feedback, preventing code changes at runtime.
- Reduce gap between development and production environment.
- Change configurations in environments without changing source code.
- Apply credentials as environment variables to free of potential security threats.

**tl;dr:** To achieve those goals mentioned above, there are 3 steps:
1. Containerize an application, and inject a configuration file into an artifact before deploying (if there are no credentials in configuration file, that’s all you need).
2. Secure a configuration file.
3. Secure a configuration file’s encryption key.

Read full article on Medium: [Secure Angular configuration/credentials in containerized environment (as of 2021)](https://medium.com/nontechcompany/secure-angular-configuration-credentials-in-containerized-environment-as-of-2021-a7f36ed676ed)

## Minimum requirements
**Node**: v12.16.1
**npm**: v6.4.1

## Development server

Run `npm start` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `npm run build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `npm test` to execute the unit tests via [Karma](https://karma-runner.github.io).
