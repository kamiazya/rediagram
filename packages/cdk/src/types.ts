import { ReactElement } from 'react';
import { EdgeAttributes } from 'ts-graphviz';

export type BuildEdgeStyle<T extends Record<string, unknown> = any> = (style: T) => EdgeAttributes;

export type DestinationDetail<T extends Record<string, unknown>> = {
  destination: string;
  description?: string | ReactElement;
} & T;

export type Destination<T extends Record<string, unknown>> = string | DestinationDetail<T>;
