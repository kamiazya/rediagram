import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'module',
        file: './lib/index.js',
      },
    ],
    external: [
      '@rediagram/cdk',
      'ts-graphviz',
      '@ts-graphviz/node',
      'fs-extra',
      'caller',
      '@rediagram/common',
      '@ts-graphviz/react',
      'react',
      'prop-types',
      'node:path',
      'node:url',
    ],
    plugins: [typescript()],
  },
  {
    input: './lib/index.d.ts',
    plugins: [
      del({
        targets: ['lib/**/*.d.ts', '!lib/index.d.ts'],
        hook: 'buildEnd',
      }),
      dts(),
    ],
    output: [
      {
        format: 'esm',
        file: './lib/index.d.ts',
      },
    ],
  },
];

export default options;
