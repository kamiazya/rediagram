import typescript from 'rollup-plugin-typescript2';

export default {
  input: './src/rediagramc.ts',
  output: [
    {
      format: 'cjs',
      file: './lib/rediagramc.js',
    },
  ],
  external: ['commander', 'fast-glob', 'path', 'fs', 'sucrase/dist/register', '@rediagram/common'],
  plugins: [typescript()],
};
