import { createContext } from 'react';

export type GroupContextType = {
  index: number;
};

export const GroupContext = createContext<GroupContextType>({ index: 1 });
