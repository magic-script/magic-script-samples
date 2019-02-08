// Rollup config for consuming some npm modules in MagicScript

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  external: ['uv', 'lumin'],
  input: 'src/main.js',
  preserveModules: true,
  output: {
    dir: 'bin',
    format: 'es'
  },
  plugins: [resolve(), commonjs()]
};
