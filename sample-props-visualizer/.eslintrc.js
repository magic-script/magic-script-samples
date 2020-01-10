// ESLint config for MagicScript Apps
module.exports = {
  env: {
    es6: true
  },
  globals: {
    // These globals are provided by the vm itself.
    print: true,
    globalThis: true,
    // The following globals are provided by `magic-script-polyfills`
    setTimeout: true,
    clearTimeout: true,
    setInterval: true,
    clearInterval: true,
    setImmediate: true,
    clearImmediate: true,
    fetch: true,
    Headers: true,
    Request: true,
    Response: true
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    useJSXTextNode: true,
    ecmaVersion: 2018,
    sourceType: "module"
  },
  plugins: ["react", "react-hooks"],
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-underscore-dangle": 0,
    "no-class-assign": 0,
    "arrow-body-style": 0,
    "global-require": 0,
    "react/sort-comp": 0,
    "react/require-extension": 0,
    "max-len": [
      "error",
      130,
      2,
      {
        ignoreUrls: true,
        ignoreComments: false
      }
    ]
  },
  extends: "semistandard"
};
