import path from 'path';

export function resolveAsset(...paths: string[]): string {
  return path.resolve(__dirname, '../assets', ...paths);
}
