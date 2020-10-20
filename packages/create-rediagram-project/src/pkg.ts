import path from 'path';
import fs from 'fs';

type PKG = {
  name: string;
  version: string;
};

const pkg: PKG = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json'), 'utf-8'));

export default pkg;
