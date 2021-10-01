import typescript from 'rollup-plugin-typescript2';
import versionInjector from 'rollup-plugin-version-injector';

export default {
  input: './src/main.ts',
  output: [
    {
      format: 'module',
      file: './lib/main.js',
    },
  ],
  external: [
    'chalk',
    'commander',
    'fs-extra',
    'ncp',
    'replacestream',
    'cross-spawn',
    'dedent',
    'validate-npm-package-name',
    'which',
    'node:url',
    'node:path',
  ],
  plugins: [typescript(), versionInjector()],
};
