import React, { FC, ReactElement, useMemo } from 'react';
import { Edge, Node, ClusterPortal } from '@ts-graphviz/react';

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

let id = 0;

function useID(): [string, string] {
  return useMemo(() => {
    id += 1;
    return [`upstream${id}`, `downstream${id}`];
  }, []);
}

export const Dependences: FC<DependencesProps> = ({ origin, upstream, downstream }) => {
  const [upstreamID, downstreamID] = useID();
  return (
    <>
      {upstream && upstream.length > 1 ? (
        <>
          <Node id={upstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge targets={[origin, upstreamID]} arrowhead="point" arrowtail="none" color="#535B63" fontcolor="#232F3D" />
        </>
      ) : null}
      {downstream ? (
        <>
          <Node id={downstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge
            targets={[origin, downstreamID]}
            constraint={false}
            arrowhead="none"
            arrowtail="none"
            color="#535B63"
            fontcolor="#232F3D"
          />
        </>
      ) : null}
      <ClusterPortal>
        {upstream
          ? upstream.map((d) => (
              // eslint-disable-next-line react/jsx-indent
              <Edge
                fontsize={12}
                color="#535B63"
                fontcolor="#232F3D"
                targets={[upstream.length === 1 ? origin : upstreamID, getDestinationName(d)]}
                label={getDestinationDescription(d)}
                key={`${upstream.length === 1 ? origin : upstreamID}-${getDestinationName(d)}`}
              />
            ))
          : null}
        {downstream
          ? downstream.map((d) => (
              // eslint-disable-next-line react/jsx-indent
              <Edge
                fontsize={12}
                color="#535B63"
                fontcolor="#232F3D"
                targets={[downstreamID, getDestinationName(d)]}
                label={getDestinationDescription(d)}
                key={`${downstreamID}-${getDestinationName(d)}`}
                constraint={false}
              />
            ))
          : null}
      </ClusterPortal>
    </>
  );
};
