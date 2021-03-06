### MagicScript Components with React Router

This repo is an example of a magicscript components app using react-router.

Please refer to the magic-script [getting started guide](https://www.magicscript.org/docs/getting-started) for help setting up your enviornment and running this app.

Aside from `react-router`, there are a few other differences between this repo and the boilerplate that is bootstrapped using `magic-script init`.

Primarily, [`babel-plugin-module-resolver`](https://github.com/tleunen/babel-plugin-module-resolver/blob/master/DOCS.md). Because we use this plugin to alias import paths, we need to make VSCode aware of this so that code complete and intellisense features still work. That's what [`jsconfig.json`](https://code.visualstudio.com/docs/languages/jsconfig) is used for.

There is also a `clean` script inlcluded in the `package.json`. This script removes all autogenerated files from your project and uninstalls the app instance from a connected ML device.

There have also been some changes to the `rollup.config.js` file. Without including at a minimum the 'isValidElementType' and 'Component' named exports from `react` and `react-is` respectively, importing `react-router` would cause the app to crash. For the react package we decided to expose all the named exports from react because `import React, { Component, useState, Fragment, etc... } from 'react'` is a very common pattern.

NOTE: This sample is specifically for the router. It's not the prettiest and I would not use this as an example of how to layout UI elements.
