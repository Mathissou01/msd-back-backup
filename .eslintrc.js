module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
    "react-app",
    "prettier",
  ],
  plugins: ["react", "prettier"],
  rules: {
    "prettier/prettier": 2,
  },
};
