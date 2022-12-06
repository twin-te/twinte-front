require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  extends: [
    "@vue/eslint-config-typescript/recommended",
    "plugin:vue/vue3-recommended",
    "plugin:import/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  ignorePatterns: "**/*.js",
  parser: "vue-eslint-parser",
  rules: {
    "vue/attribute-hyphenation": 0,
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "index",
          "sibling",
          "unknown",
          "type",
        ],
        alphabetize: { order: "asc" },
      },
    ],
    "import/no-restricted-paths": [
      "warn", //TODO: errorにする
      {
        zones: [
          {
            target: "./src/(usecases|entities|adapter)",
            from: "node_modules/vue",
            message:
              "フレームワーク非依存な層です。hooks層での実装を検討してください。",
          },
          {
            target: "./src/!(entities)/**/*",
            from: "./src/api/@types",
            message: "APIの型定義はEntityに関数を作成して利用してください。",
          },
        ],
      },
    ],
  },
};
