// import resolve from 'rollup-plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'

const meta = { name: 'impresso-jscommons' }

const config = {
  input: 'src/index.js',
  external: ['base64-js', 'case', 'google-protobuf'],
  output: {
    file: `dist/${meta.name}.js`,
    name: meta.name,
    format: 'umd',
    exports: 'named' /** Disable warning for default imports */,
    indent: false,
    extend: true,
    globals: {
      'base64-js': 'base64-js',
      case: 'case',
      'google-protobuf': 'goog',
    },
  },
  plugins: [
    // resolve()
    commonjs(),
    babel({
      babelHelpers: 'bundled',
      exclude: 'node_modules/**',
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

export default [
  config,
  {
    ...config,
    output: {
      ...config.output,
      compact: true,
      file: `dist/${meta.name}.min.js`,
    },
    plugins: [...config.plugins, terser()],
  },
]
