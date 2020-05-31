import { useContext } from 'react';
import { ProviderContext } from '../contexts/ProviderContext';

export function useProvider(): string | null {
  return useContext(ProviderContext);
}
