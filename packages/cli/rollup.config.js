import typescript from 'rollup-plugin-typescript2';
import versionInjector from 'rollup-plugin-version-injector';

/** @type {import('rollup').RollupOptions[]} */
const options = [
  {
    input: './src/rediagramc.ts',
    output: [
      {
        format: 'module',
        file: './lib/rediagramc.js',
      },
    ],
    external: ['commander', 'fast-glob', 'path', 'fs', 'rediagram', 'chokidar'],
    plugins: [typescript(), versionInjector()],
  },
];

export default options;
