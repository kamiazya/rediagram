import { useContext } from 'react';
import { Context } from '../contexts/Context';
import { FirebaseContext } from '../types';

export function useFirebaseContext(): FirebaseContext {
  return useContext(Context);
}
