# MSD-BACK

Back-office app (frontend) in NextJS.

## Structure

(WIP)

## Config

(WIP)

## Conventions

(WIP) Javascript, Typescript, Linters, etc

### CSS/SCSS

Using ITCSS with BEMIT/BEM syntax for CSS/SCSS.

Using PurgeCSS plugin for PostCSS to purge unused CSS, requires config and whitelisting in order to keep some CSS. CSS
used by imported components and libraries (from node_modules) is not detected by default and needs to be added to the
whilelist.

## Installation

### Development

```bash
npm run develop
```

The app will run at [http://localhost:3001](http://localhost:3001).

### Production

Build the application first :

```bash
npm run build
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
