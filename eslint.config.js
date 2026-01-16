// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");
const jasminePlugin = require("eslint-plugin-jasmine");
const prettierConfig = require("eslint-config-prettier");

module.exports = tseslint.config(
  {
    ignores: [
      "packages/api/**/*",
      "packages/@idemsInternational/**/*",
      "src/app/shared/components/template/components/odk-form/**",
      "src/assets/**/*.js",
      "dist/**/*",
      "www/**/*",
      ".angular/**/*",
      ".git/**/*",
      "node_modules/**/*",
    ],
  },
  {
    files: ["**/*.ts"],
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    extends: [tseslint.configs.eslintRecommended, ...angular.configs.tsRecommended],
    processor: angular.processInlineTemplates,
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        createDefaultProgram: true,
      },
    },
    rules: {
      "@angular-eslint/component-class-suffix": [
        "warn",
        { suffixes: ["page", "Page", "component", "Component", "class", "skin"] },
      ],
      "@angular-eslint/component-selector": ["warn", { type: "element", style: "kebab-case" }],
      "@angular-eslint/directive-selector": [
        "warn",
        { type: "attribute", prefix: ["plh", "oab"], style: "camelCase" },
      ],
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-member-accessibility": ["off", { accessibility: "explicit" }],
      "@typescript-eslint/member-delimiter-style": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-inferrable-types": ["off", { ignoreParameters: true }],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/quotes": ["off", "double", { allowTemplateLiterals: true }],
      "@typescript-eslint/semi": ["off", null],
      "@typescript-eslint/naming-convention": ["off"],
      "@typescript-eslint/member-ordering": "off",
      "@typescript-eslint/prefer-for-of": "warn",
      "@typescript-eslint/sort-type-constituents": "off",
      "@typescript-eslint/no-unused-expressions": "warn",
      "@typescript-eslint/no-shadow": "warn",
      "@angular-eslint/no-output-on-prefix": "warn",
      "@angular-eslint/prefer-standalone": "off",
      "arrow-parens": ["off", "always"],
      curly: "off",
      "import/order": "off",
      "one-var": ["off", "never"],
      "prefer-const": "off",
      "quote-props": ["off", "as-needed"],
      "prefer-arrow/prefer-arrow-functions": "off",
      "no-underscore-dangle": "off",
      "object-shorthand": "warn",
      "no-var": "error",
      "no-console": "off",
      radix: "warn",
      eqeqeq: "warn",
      "no-fallthrough": "warn",
      "no-throw-literal": "warn",
      "use-isnan": "warn",
      "arrow-body-style": "off",
      "sort-keys": "off",
      "no-unused-vars": "off",
      "no-undef": "off",
      "prefer-spread": "off",
      "prefer-rest-params": "off",
      "@angular-eslint/prefer-inject": "off",
      "no-restricted-imports": [
        "error",
        {
          name: "firebase/firestore",
          message: "Avoid using firestore web SDK. Use @capacitor-firebase/firestore instead.",
        },
      ],
    },
  },
  {
    files: ["**/*.html"],
    extends: [...angular.configs.templateRecommended, ...angular.configs.templateAccessibility],
    rules: {
      "@angular-eslint/template/eqeqeq": "warn",
      "@angular-eslint/template/prefer-control-flow": "off",
      "@angular-eslint/template/click-events-have-key-events": "warn",
      "@angular-eslint/template/interactive-supports-focus": "warn",
      "@angular-eslint/template/alt-text": "warn",
    },
  },
  {
    files: ["**/*.spec.ts"],
    plugins: {
      jasmine: jasminePlugin,
    },
    languageOptions: {
      globals: {
        jasmine: "readonly",
        describe: "readonly",
        it: "readonly",
        expect: "readonly",
        beforeEach: "readonly",
        afterEach: "readonly",
        beforeAll: "readonly",
        afterAll: "readonly",
        spyOn: "readonly",
        fail: "readonly",
        xdescribe: "readonly",
        xit: "readonly",
      },
    },
    rules: {
      ...jasminePlugin.configs.recommended.rules,
      "jasmine/no-focused-tests": 2,
      "jasmine/new-line-before-expect": 0,
      "jasmine/new-line-between-declarations": 0,
      "jasmine/prefer-toHaveBeenCalledWith": 0,
    },
  },
  prettierConfig
);
