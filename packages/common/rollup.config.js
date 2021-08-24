import typescript from 'rollup-plugin-typescript2';
import del from 'rollup-plugin-delete';
import dts from 'rollup-plugin-dts';

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: './src/index.ts',
    output: [
      {
        format: 'cjs',
        file: './lib/index.js',
      },
    ],
    external: ['path', 'cosmiconfig', 'fs-extra', 'tslog', '@ts-graphviz/react', '@ts-graphviz/node'],
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
