import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: Object.keys(pkg.peerDependencies || {}),
    plugins: [
      typescript({
        typescript: require('typescript'),
      }),
    ],
    output: [
      { file: pkg.main, format: 'cjs' },
      { file: pkg.module, format: 'esm' },
      {
        file: 'test/example-for-test/src/reactRouterAdvance/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },

      {
        file: 'examples/basic-and-nested-routing/src/reactRouterAdvance/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
      {
        file: 'examples/using-of-guards/src/reactRouterAdvance/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
      {
        file: 'examples/using-of-resolvers/src/reactRouterAdvance/index.js',
        format: 'es',
        banner: '/* eslint-disable */',
      },
    ],
  },
];
