// ESLint config for MagicScript Apps
module.exports = {
    env: {
        "es6": true
    },
    globals: {
        // These globals are provided by the vm itself.
        "print": true,
        "globalThis": true,
        // The following globals are provided by `magic-script-polyfills`
        "setTimeout": true,
        "clearTimeout": true,
        "setInterval": true,
        "clearInterval": true,
        "setImmediate": true,
        "clearImmediate": true,
        "fetch": true,
        "Headers": true,
        "Request": true,
        "Response": true,

    },
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    extends: "semistandard",
};