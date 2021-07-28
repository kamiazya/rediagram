import { useProvider } from '@rediagram/cdk';

export function useAssertProvider(): void {
  const provider = useProvider();
  if (!(provider === null || provider === 'firebase' || provider === 'gcp')) {
    throw Error();
  }
}
