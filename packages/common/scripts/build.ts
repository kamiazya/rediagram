import path from 'path';
import { rollup } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import dts from 'rollup-plugin-dts';
import rimraf from 'rimraf';

async function build() {
  await rollup({
    input: path.resolve(__dirname, '../src/index.ts'),
    external: ['path', 'cosmiconfig', 'fs-extra', '@ts-graphviz/react', '@ts-graphviz/node', 'tslog'],
    plugins: [typescript()],
  }).then((result) =>
    result.write({
      format: 'cjs',
      file: path.resolve(__dirname, '../lib/index.js'),
    }),
  );

  await rollup({
    input: path.resolve(__dirname, '../lib/index.d.ts'),
    plugins: [dts()],
  }).then(async (result) => {
    rimraf.sync(path.resolve(__dirname, '../lib/**/*.d.ts'));
    await result.write({
      format: 'esm',
      file: path.resolve(__dirname, '../lib/index.d.ts'),
    });
  });
}

build();
