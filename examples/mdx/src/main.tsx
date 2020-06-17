import fs from 'fs';
import path from 'path';
import { Renderer } from '@ts-graphviz/mdx';
import { CommonPlugin } from 'rediagram';
import { AWSPlugin } from '@rediagram/aws';
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

function main(input: string, output: string): void {
  const decoder = new StringDecoder();
  const buf = fs.readFileSync(input);
  const mdx = decoder.write(buf);
  const html = MDX.renderToHTML(mdx);
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, `<!DOCTYPE html>${html}`);
}

main(path.resolve(__dirname, '../MyInfra.mdx'), path.resolve(__dirname, '../dist/MyInfra.html'));
