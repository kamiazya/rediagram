import { createContext } from 'react';
import { BuildEdgeStyle } from '../types';

export const EdgeStyleBuilderContext = createContext<BuildEdgeStyle>(() => ({}));
