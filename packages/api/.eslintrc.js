module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint/eslint-plugin"],
  extends: ["plugin:@typescript-eslint/recommended", "plugin:prettier/recommended"],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [".eslintrc.js"],
  rules: {
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/ban-types": "off",
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "@nestjs/sequelize",
            importNames: ["InjectConnection", "InjectModel"],
            message: "Do not inject from sequelize. Use deployment service instead",
          },
        ],
      },
    ],
    "prettier/prettier": [
      1,
      {
        endOfLine: "auto",
      },
    ],
  },
};
