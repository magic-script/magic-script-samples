// Rollup config for consuming some npm modules in MagicScript

import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

const common = {
  external: ['uv', 'lumin', 'ssl', "jpeg", 'png', 'gl'],
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve(),
    commonjs(),
  ]
};

export default [
  {
    ...common,
    input: 'src/main.js',
    preserveModules: true,
    output: {
      dir: 'bin',
      format: 'es',
    },
  },
  {
    ...common,
    input: 'src/app.js',
    output: {
      file: 'bin/bundle.js',
      format: 'iife',
      name: 'mxs_bundle',
    },
  },
];
