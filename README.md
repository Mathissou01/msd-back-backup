# MSD-BACK

Back-office app (frontend) in NextJS, exported in static HTML and deployed on an Azure Static Web App.

Uses Apollo Client for GraphQL requests, mocking with graphql-codegen and graphql-tools.

## Config

Copy the `.env.example` and rename the copy `.env`.

Replace the example values with real values for your environment.

|             KEY              |               DESCRIPTION                |                     DEFAULT VALUE                     |
| :--------------------------: | :--------------------------------------: | :---------------------------------------------------: |
|    NEXT_PUBLIC_BASE_HOST     |        HOST of this app, msd-back        |                   http://localhost                    |
|    NEXT_PUBLIC_BASE_HOST     |        PORT of this app, msd-back        |                         3001                          |
|     NEXT_PUBLIC_API_URL      | URL of the GraphQL endpoint, msd-fn-back |                 http://localhost:7071                 |
| NEXT_PUBLIC_AZURE_SEARCH_URL |     URL of the Azure Search service      | https://[your-azure-search-domain].search.windows.net |

## Installation

This application uses graphql-codegen to get the graphql schema from the API, this schema can be used to run the
application locally with a mocked client and mocked data.
With mocks, you can test the application and develop without access to the real API.

First install dependencies with `npm i`.

### Development

```bash
npm run develop
```

With mocks :

```bash
npm run develop:mock
```

The app will run at [http://localhost:3001](http://localhost:3001).

### Production

It is recommended to first clean the compiled and cached files by running :

```bash
npm run clean
```

Then build the application :

```bash
npm run build
```

With mocks :

```bash
npm run build:mock
```

This will generate a `.next/` folder containing the built app, with various files, a cache and the pages separated in
/server (sor SSR pages), /static (for SSG pages).

Then the built application can be started as a normal web app with :

```bash
npm run start
```

Or it can be exported as a static web app with :

```bash
npm run export
```

## Usage

After installing, there are many `npm` commands available.

### Utilities

`npm run clean` removes all of the temporary or generated folders from building or testing such as `.cache`, `.next`
, `out`, `coverage`, etc.

### Mocking

`npm run codegen` runs the graphql-codegen generation configured in `src/graphql/codegen.ts`, generating a graphql
schema and types from the URL in `.env` `NEXT_PUBLIC_API_URL`, on the /graphql endpoint.

This codegen config also generates typescript typings for the entire schema, as well as custom wrapper hooks for
all `.graphql` files as apollo `useQuery` hooks.

> This schema is used only in development in order to easily have access to the schema, get queries and mutations as
> well
> as mock API responses in `:mock` mode.

### Linting

`npm run lint` runs all linters in order : ESLint, Stylelint, Prettier.

`npm run lint:eslint` runs ESLint from the `.eslintrc.json` config, ignoring files from `.gitignore` and `.eslintignore`
.

`npm run lint:style` runs Stylelint from the `.stylelintrc.json` config, ignoring files from `.gitignore`.

`npm run lint:prettier` runs ESLint from the `.prettierrc.json` config, ignoring files from `.gitignore`
and `.prettier.ignore`.

### Testing

`npm run pretest` automatically runs when running `test`, it checks Typescript compilation.

`npm run test` runs `test:jest` and `test:e2e` in order.

`npm run test:ci` runs the CI versions of the same commands, `test:jest:ci` and `test:e2e:ci` in order.

#### Unit Testing

`npm run test:jest` runs the Jest test-runner for unit-tests with the configuration from `jest.config.js`. This checks
all `.test.` files in the project excluding those in `/e2e/`

`npm run test:jest:ci` is the same with CI parameters (no prompt, extra reporters, etc).

#### End-to-end Testing

`npm run test:e2e` runs the Playwright test-runner for end-to-end tests with the configuration
from `playwright.config.ts`. This checks all `.spec.` files in the `/e2e/` folder.

`npm run test:e2e:ci` is the same with CI parameters (installing playwright and dependencies, etc).

> Before running Playwright for the first time, you will need to install the playwright dependencies in your local
> environment with
> `npx playwright install`. Occasionally, Playwright will ask you to install dependencies again when new versions of the
> testing browsers are required.

> E2E testing requires a build (a `.next` folder built with `npm run build` or `npm run build:mock`) to be available,
> and
> Playwright will start a webserver with this build
> before running the tests. If the build isn't mocked, then other services (Azure Functions, API, etc) will need to be
> running for the tests to work.

## Conventions & Best Practices

Refer
to [Developer Documentation: Conventions & Coding Best Practices](https://dev.azure.com/SuezCircularSolutions/MSD/_wiki?pageId=18&friendlyName=Conventions-Coding-Best-Practices#)
in msd-doc or the Azure Devops wiki.
