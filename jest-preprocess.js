/* eslint-disable */
const babelOptions = {
  presets: [
    [
      "@babel/preset-env",
      {
        modules: "commonjs",
      },
    ],
    "@babel/preset-react",
    "@babel/preset-typescript",
  ],
};

module.exports = require("babel-jest").createTransformer(babelOptions);
/* eslint-enable */
