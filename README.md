# MSD-BACK

Back-office app (frontend) in NextJS.

## Structure

(WIP)

## Config

(WIP)

## Conventions

(WIP) Javascript, Typescript, Linters, etc

### CSS/SCSS

Using an adapted ITCSS with BEMIT/BEM syntax for CSS/SCSS.

Using PurgeCSS plugin for PostCSS to purge unused CSS, requires config and whitelisting in order to keep some CSS. CSS
used by imported components and libraries (from node_modules) is not detected by default and needs to be added to the
whilelist.

## Installation

This application uses graphql-codegen to get the graphql schema from the API, this schema can be used to run the
application locally with a mocked client and mocked data.
With mocks, you can test the application and develop without access to the real API.

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

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!
