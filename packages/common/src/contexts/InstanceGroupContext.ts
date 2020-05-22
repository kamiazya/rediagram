import { createContext } from 'react';

export type InstanceGroupContextType = {
  name: string;
};

export const InstanceGroupContext = createContext<InstanceGroupContextType>({
  name: 'root',
} as InstanceGroupContextType);
