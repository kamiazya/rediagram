import path from 'path';
import fs from 'fs';

type PKG = {
  version: string;
};

const pkg: PKG = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../package.json')).toString());

export = pkg;
