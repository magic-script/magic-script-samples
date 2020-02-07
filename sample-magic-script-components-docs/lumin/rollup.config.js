import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import includePaths from 'rollup-plugin-includepaths';
import typescript from 'rollup-plugin-typescript';

let includePathOptions = {
  include: {},
  paths: ['./src', '../src'],
  external: []
};

const common = {
  plugins: [
    includePaths(includePathOptions),
    babel({
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    resolve({
      customResolveOptions: {
        moduleDirectory: '../node_modules'
      }
    }),
    commonjs(),
    typescript()
  ]
};

export default [
  // Build for MagicScript on LuminOS
  {
    ...common,
    external: ['uv', 'lumin', 'ssl', 'jpeg', 'png', 'gl'],
    input: 'src/main.tsx',
    preserveModules: true,
    output: {
      dir: 'bin',
      format: 'es'
    }
  },
  // Build for MagicScript on Magicverse (iOS, Android)
  {
    ...common,
    input: '../src/app.tsx',
    external: ['react'],
    output: {
      globals: {
        'react': 'React'
      },
      file: '../reactnative/bin/bundle.js',
      format: 'iife',
      name: '_'
    }
  }
];
