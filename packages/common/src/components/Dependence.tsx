import React, { FC, ReactElement } from 'react';
import { Edge } from '@ts-graphviz/react';

export type Destination = string | { destination: string; description?: string | ReactElement };

export function getDestinationName(destination: Destination): string {
  return typeof destination === 'string' ? destination : destination.destination;
}

export function getDestinationDescription(destination: Destination): string | ReactElement | undefined {
  return typeof destination === 'string' ? undefined : destination.description;
}

export type HasDependences = {
  upstream?: Destination[];
  downstream?: Destination[];
};

export type DependencesProps = {
  origin: string;
} & HasDependences;

export const Dependences: FC<DependencesProps> = ({ origin, upstream, downstream }) => (
  <>
    {upstream
      ? upstream.map((d) => (
          // eslint-disable-next-line react/jsx-indent
          <Edge
            targets={[origin, getDestinationName(d)]}
            label={getDestinationDescription(d)}
            key={`${origin}-${getDestinationName(d)}`}
          />
        ))
      : null}
    {downstream
      ? downstream.map((d) => (
          // eslint-disable-next-line react/jsx-indent
          <Edge
            targets={[origin, getDestinationName(d)]}
            label={getDestinationDescription(d)}
            key={`${origin}-${getDestinationName(d)}`}
            constraint={false}
          />
        ))
      : null}
  </>
);
