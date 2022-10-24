module.exports = {
  plugins: [
    "postcss-flexbugs-fixes",
    [
      "postcss-preset-env",
      {
        autoprefixer: {
          flexbox: "no-2009",
        },
        stage: 3,
        features: {
          "custom-properties": false,
        },
      },
    ],
    [
      "@fullhuman/postcss-purgecss",
      {
        content: [
          "./src/pages/**/*.{js,jsx,ts,tsx}",
          "./src/components/**/*.{js,jsx,ts,tsx}",
          /* vendors/external libraries */
          "./node_modules/react-datepicker/**/*.{js,jsx,ts,tsx,html}",
          "./node_modules/react-big-calendar/**/*.{js,jsx,ts,tsx,html}",
          "./node_modules/leaflet*/**/*.{js,jsx,ts,tsx,html}",
        ],
        defaultExtractor: (content) => content.match(/[\w-/:]+(?<!:)/g) || [],
        safelist: {
          standard: ["html", "body"],
          deep: [
            /^c-/,
            /* vendors/external libraries */
            /^react-datepicker/,
            /^rbc/,
            /^leaflet/,
          ],
        },
      },
    ],
  ],
};
