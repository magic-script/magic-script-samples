// Rollup config for consuming some npm modules in MagicScript

import React from "react";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

const common = {
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve(),
    commonjs({
      include: "node_modules/**",
      namedExports: {
        // We should probably declare all named react exports by default.
        react: Object.keys(React),
        "react-is": ["isValidElementType"]
      }
    })
  ]
};

export default [
  {
    ...common,
    external: ["uv", "lumin", "ssl", "jpeg", "png", "gl"],
    input: "src/main.js",
    preserveModules: true,
    output: {
      dir: "bin",
      format: "es"
    }
  },
  {
    ...common,
    external: ["react"],
    input: "src/app.js",
    output: {
      globals: { react: "React" },
      file: "bin/bundle.js",
      format: "iife",
      name: "_"
    }
  }
];
