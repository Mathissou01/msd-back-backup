module.exports = {
  globals: {
    __PATH_PREFIX__: true,
  },
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "react-app",
    "react-app/jest",
    "prettier",
  ],
  plugins: ["@typescript-eslint", "react", "prettier"],
  rules: {
    "prettier/prettier": 2,
  },
};
