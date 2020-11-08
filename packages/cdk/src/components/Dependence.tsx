/* eslint-disable @typescript-eslint/ban-types, react/jsx-props-no-spreading */
import React, { FC, useMemo } from 'react';
import { Edge, Node, ClusterPortal } from '@ts-graphviz/react';
import { useDependences } from '../hooks/dependences';
import { Destination } from '../types';

export type HasDependences<T extends Record<string, unknown> = {}> = {
  upstream?: Destination<T>[];
  downstream?: Destination<T>[];
  dependencesOption?: T;
};

export type DependencesProps<T extends Record<string, unknown> = {}> = {
  origin: string;
} & HasDependences<T>;

let id = 0;

function useID(): [string, string] {
  return useMemo(() => {
    id += 1;
    return [`upstream${id}`, `downstream${id}`];
  }, []);
}

export const Dependences: FC<DependencesProps> = ({ origin, ...dependences }) => {
  const [upstreamID, downstreamID] = useID();
  const { upstream, downstream, edgeAttributes } = useDependences(dependences);
  return (
    <>
      {upstream && upstream.length > 1 ? (
        <>
          <Node id={upstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge {...edgeAttributes} targets={[origin, upstreamID]} arrowhead="point" arrowtail="none" />
        </>
      ) : null}
      {downstream && downstream.length > 1 ? (
        <>
          <Node id={downstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge {...edgeAttributes} targets={[downstreamID, origin]} dir="none" />
        </>
      ) : null}
      <ClusterPortal>
        {upstream
          ? upstream.map((d) => (
              // eslint-disable-next-line react/jsx-indent
              <Edge
                {...{ ...edgeAttributes, ...d.edgeAttributes }}
                fontsize={12}
                targets={[upstream.length === 1 ? origin : upstreamID, d.destination]}
                label={d.description}
                key={`${upstream.length === 1 ? origin : upstreamID}-${d.destination}`}
              />
            ))
          : null}
        {downstream
          ? downstream.map((d) => (
              // eslint-disable-next-line react/jsx-indent
              <Edge
                {...{ ...edgeAttributes, ...d.edgeAttributes }}
                fontsize={12}
                targets={[d.destination, downstream.length === 1 ? origin : downstreamID]}
                label={d.description}
                key={`${downstreamID}-${d.destination}`}
                dir="back"
              />
            ))
          : null}
      </ClusterPortal>
    </>
  );
};
