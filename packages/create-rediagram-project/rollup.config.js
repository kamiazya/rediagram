import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/main.ts',
  output: [
    {
      format: 'cjs',
      file: './lib/main.js',
    },
  ],
  external: [
    'chalk',
    'commander',
    'fs-extra',
    'fs',
    'ncp',
    'path',
    'replacestream',
    'cross-spawn',
    'dedent',
    'validate-npm-package-name',
    'which',
  ],
  plugins: [typescript()],
};
