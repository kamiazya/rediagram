import { createContext } from 'react';
import { FirebaseContext } from '../types';

export const Context = createContext<FirebaseContext>({
  defaultType: 'light',
  serviceName: false,
});
