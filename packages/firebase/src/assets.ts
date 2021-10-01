import path from 'node:path';
import url from 'node:url';

// eslint-disable-next-line no-underscore-dangle
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export function resolveAsset(...paths: string[]): string {
  return path.resolve(__dirname, '../assets', ...paths);
}
