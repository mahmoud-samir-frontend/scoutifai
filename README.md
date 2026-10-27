# SCOUTIFAI

A complete role-based sports performance and operations interface built with Angular 19. It covers players, teams, training, matches, wellness, medical workflows, video, analytics, permissions, and bilingual English/Arabic presentation.

This public repository runs in demo mode by default with local browser data. Live API endpoints, audit exports, production records, and private integration configuration are intentionally excluded.

## Run locally

```bash
npm install
npm start
```

Open `http://localhost:4200` and use one of the role accounts:

| Documented user type | Email | Password |
| --- | --- | --- |
| SuperAdmin | `admin@sports.com` | `Admin@123` |
| OrganizationAdmin | `organization@sports.com` | `Organization@123` |
| ClubAdmin | `club@sports.com` | `Club@123` |
| TeamManager | `manager@sports.com` | `Manager@123` |
| Coach | `coach@sports.com` | `Coach@123` |
| FitnessCoach | `fitness@sports.com` | `Fitness@123` |
| Doctor | `doctor@sports.com` | `Doctor@123` |
| Player | `player@sports.com` | `Player@123` |
| Physiotherapist | `physio@sports.com` | `Physio@123` |
| Parent | `parent@sports.com` | `Parent@123` |
| Scout | `scout@sports.com` | `Scout@123` |
| DataAnalyst | `analyst@sports.com` | `Analyst@123` |

Each role receives its own allowed sidebar menu. The green sidebar can be collapsed and remembers its state.

## Structure

- `src/app/features` — login and management screens
- `src/app/shared/components` — shared header and brand logo
- `src/app/services` — authentication and API services
- `src/app/core` — route guard and HTTP authentication interceptor
- `src/app/models` — application models
- `public/assets/images` — project imagery

## Workbook-aligned local data

The local entity system follows `player-performance-frontend-demo.xlsx`. See [docs/entity-contract.md](docs/entity-contract.md) for the generated contracts, local CRUD behavior, relationships, and documented exclusions.

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.23.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
