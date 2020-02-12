// Rollup config for consuming some npm modules in MagicScript

import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript';

export default {
  external: ['uv', 'lumin', 'ssl'],
  input: 'src/main.ts',
  preserveModules: true,
  output: {
    dir: 'bin',
    format: 'es'
  },
  plugins: [resolve(), commonjs(), typescript()]
};
