/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable react/jsx-props-no-spreading */
// import React, { FC } from 'react';
import fs from 'fs';
import path from 'path';
import { StringDecoder } from 'string_decoder';
import { renderToHTML } from '@ts-graphviz/mdx';
import { Diagram } from '@diagrams-prototype/mdx';

function main(): void {
  const decoder = new StringDecoder();
  const buf = fs.readFileSync(path.resolve(__dirname, '../MyInfra.mdx'));
  const mdx = decoder.write(buf);
  const html = renderToHTML(mdx, {
    components: {
      Diagram,
    },
  });
  const output = path.resolve(__dirname, '../dist/MyInfra.html');
  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, html);
}

main();
