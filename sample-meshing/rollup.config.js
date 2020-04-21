// Rollup config for consuming some npm modules in MagicScript

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import polyfill from 'magic-script-polyfills/rollup-plugin-node.js'

export default {
  external: ['uv', 'lumin', 'ssl', 'png', 'jpeg', 'gl', 'egl'],
  input: 'src/main.js',
  preserveModules: true,
  output: {
    dir: 'bin',
    format: 'es'
  },
  plugins: [polyfill(), resolve(), commonjs()]
};
