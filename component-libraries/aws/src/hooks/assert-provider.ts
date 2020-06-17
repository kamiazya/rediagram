import { useProvider } from 'rediagram';

export function useAssertProvider(): void {
  const provider = useProvider();
  if (!(provider === null || provider === 'aws')) {
    throw Error();
  }
}
