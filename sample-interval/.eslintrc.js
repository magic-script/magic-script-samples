// ESLint config for MagicScript Apps
module.exports = {
    env: {
        "es6": true
    },
    globals: {
        "print": true,
        "setTimeout": true,
        "setInterval": true,
        "globalThis": true,
    },
    extends: "eslint:recommended",
    parserOptions: {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    rules: {
        "indent": [
            "error",
            2
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ]
    }
};