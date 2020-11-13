import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { AWSContext } from '../types';

export function useAWSContext(): AWSContext {
  return useContext(Context);
}
