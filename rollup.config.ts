import { RollupOptions } from "rollup";
import meta from './package.json' with { type: 'json' };
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

const defaultConfig: RollupOptions = {
  input: 'src/index.js',
  external: ['base64-js', 'case', 'google-protobuf'],
  output: {
    file: `dist/${meta.name}.js`,
    name: meta.name,
    format: 'umd',
    exports: 'named', /** Disable warning for default imports */
    indent: false,
    extend: true,
    globals: {
      'base64-js': 'base64-js',
      case: 'case',
      'google-protobuf': 'goog',
    },
  },
  plugins: [
    typescript(),
    // resolve()
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      presets: [
        [
          '@babel/env',
          {
            modules: false,
            targets: {
              browsers: '> 1%, IE 11, not op_mini all, not dead',
              node: 8,
            },
            // useBuiltIns: 'usage'
          },
        ],
      ],
    }),
  ],
}

const minifiedConfig: RollupOptions = {
  ...defaultConfig,
  output: {
    ...defaultConfig.output,
    file: `dist/${meta.name}.min.js`,
  },
  plugins: [
    ...(defaultConfig.plugins as any[]),
    terser(),
  ],
}

export default [
  defaultConfig,
  // no need for a minified version now
  // minifiedConfig,
]
