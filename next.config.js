// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const CopyPlugin = require("copy-webpack-plugin");

/** @type {import("next").NextConfig} */
const nextConfig = {
  transpilePackages: ["@suezenv/react-theme-components", "react-date-picker"],
  reactStrictMode: true,
  swcMinify: false,
  images: {
    loader: "default",
    domains: ["localhost"],
    unoptimized: true,
  },
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  pageExtensions: ["page.js", "page.jsx", "page.ts", "page.tsx"],
  webpack(config) {
    // Enable topLevelAwait, ES2017 in tsconfig
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    // Graphql
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: "graphql-tag/loader",
        },
      ],
    });
    // Disable CSS Modules
    config.module.rules.forEach((rule) => {
      const { oneOf } = rule;
      if (oneOf) {
        oneOf.forEach((one) => {
          if (!`${one.issuer?.and}`.includes("_app")) return;
          one.issuer.and = [path.resolve(__dirname)];
        });
      }
    });
    // TinyMCE
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.join(__dirname, "node_modules/tinymce"),
            to: path.join(__dirname, "public/assets/libs/tinymce"),
          },
        ],
      }),
    );
    return config;
  },
};

module.exports = nextConfig;
