import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: './lib/index.js',
    },
  ],
  external: ['@rediagram/common', 'ajv', 'react'],
  plugins: [typescript()],
};
