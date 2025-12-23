import meta from './package.json' with { type: 'json' };
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

// Create base configuration
const createConfig = (format, outputFile, isMinified = false) => {
  const config = {
    input: 'src/index.ts',
    external: ['base64-js', 'google-protobuf'],
    output: {
      file: outputFile,
      format,
      name: meta.name,
      exports: 'named',
      indent: false,
      extend: true,
      globals: {
        'base64-js': 'base64-js',
        'google-protobuf': 'goog',
      },
      // For esm format, add useful properties
      ...(format === 'es' && {
        sourcemap: true,
      })
    },
    plugins: [
      typescript(),
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
            },
          ],
        ],
      }),
    ],
  };

  if (isMinified) {
    config.plugins.push(terser());
  }

  return config;
};

// const defaultConfig = {
//   input: 'src/index.ts',
//   external: ['base64-js', 'case', 'google-protobuf'],
//   output: {
//     file: `dist/${meta.name}.js`,
//     name: meta.name,
//     format: 'umd',
//     exports: 'named', /** Disable warning for default imports */
//     indent: false,
//     extend: true,
//     globals: {
//       'base64-js': 'base64-js',
//       case: 'case',
//       'google-protobuf': 'goog',
//     },
//   },
//   plugins: [
//     typescript(),
//     // resolve()
//     commonjs(),
//     babel({
//       exclude: 'node_modules/**',
//       babelHelpers: 'bundled',
//       presets: [
//         [
//           '@babel/env',
//           {
//             modules: false,
//             targets: {
//               browsers: '> 1%, IE 11, not op_mini all, not dead',
//               node: 8,
//             },
//             // useBuiltIns: 'usage'
//           },
//         ],
//       ],
//     }),
//   ],
// }

// const minifiedConfig = {
//   ...defaultConfig,
//   output: {
//     ...defaultConfig.output,
//     file: `dist/${meta.name}.min.js`,
//   },
//   plugins: [
//     ...(defaultConfig.plugins),
//     terser(),
//   ],
// }

export default [
  // ES module format (for modern bundlers like webpack, rollup, Vue CLI)
  createConfig('es', `dist/${meta.name}.esm.js`),
  
  // CommonJS format (for Node.js)
  createConfig('cjs', `dist/${meta.name}.cjs.js`),
  
  // UMD format (for browsers and legacy bundlers)
  createConfig('umd', `dist/${meta.name}.js`),
  
  // Minified UMD version
  createConfig('umd', `dist/${meta.name}.min.js`, true),
]
