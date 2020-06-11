import '@diagrams-prototype/aws';
import '@diagrams-prototype/common';

import fs from 'fs';
import path from 'path';
import { StringDecoder } from 'string_decoder';
import GraphvizMDX from '@ts-graphviz/mdx';
import { Page } from './components/Page';

function main(): void {
  const decoder = new StringDecoder();
  const buf = fs.readFileSync(path.resolve(__dirname, '../MyInfra.mdx'));
  const mdx = decoder.write(buf);
  GraphvizMDX.use({
    mdx: {
      wrapper: Page,
    },
  });
  const html = GraphvizMDX.renderToHTML(mdx);
  const output = path.resolve(__dirname, '../dist/MyInfra.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `<!DOCTYPE html>${html}`);
}

main();
