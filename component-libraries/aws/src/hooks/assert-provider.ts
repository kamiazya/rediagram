import { useProvider } from '@diagrams-prototype/common';

export function useAssertProvider(): void {
  const provider = useProvider();
  if (!(provider === null || provider === 'aws')) {
    throw Error();
  }
}
