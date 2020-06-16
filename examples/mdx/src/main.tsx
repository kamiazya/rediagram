import fs from 'fs';
import path from 'path';
import { Renderer } from '@ts-graphviz/mdx';
import { CommonPlugin } from '@diagrams-prototype/common';
import { AWSPlugin } from '@diagrams-prototype/aws';

import { StringDecoder } from 'string_decoder';
import { Page } from './components/Page';

const MDX = new Renderer();

MDX.use(CommonPlugin)
  .use(AWSPlugin)
  .use({
    mdx: {
      wrapper: Page,
    },
  });

function main(): void {
  const decoder = new StringDecoder();
  const buf = fs.readFileSync(path.resolve(__dirname, '../MyInfra.mdx'));
  const mdx = decoder.write(buf);
  const html = MDX.renderToHTML(mdx);
  const output = path.resolve(__dirname, '../dist/MyInfra.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `<!DOCTYPE html>${html}`);
}

main();
