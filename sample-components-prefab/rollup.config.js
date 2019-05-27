// Rollup config for consuming some npm modules in MagicScript
import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';

export default {
  external: ['uv', 'lumin', 'ssl'],
  input: 'src/main.js',
  preserveModules: true,
  output: {
    dir: 'bin',
    format: 'es'
  },
  plugins: [
    babel({ exclude: "node_modules/**" }),
    resolve(),
    commonjs()
  ]
};
