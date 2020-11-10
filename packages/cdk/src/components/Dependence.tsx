/* eslint-disable @typescript-eslint/ban-types, react/jsx-props-no-spreading */
import React, { FC, useMemo } from 'react';
import { Edge, Node, ClusterPortal } from '@ts-graphviz/react';
import { useDependences } from '../hooks/dependences';
import { Destination } from '../types';

export type HasDependences<T extends Record<string, unknown> = {}> = {
  upstream?: Destination<T & { position?: 'forward' | 'backward' }>[];
  downstream?: Destination<T>[];
  dependencesOption?: T;
};

export type DependencesProps<T extends Record<string, unknown> = {}> = {
  origin: string;
} & HasDependences<T>;

let id = 0;

function useID(): [string, string, string] {
  return useMemo(() => {
    id += 1;
    return [`forward_upstream_${id}`, `backward_upstream_${id}`, `downstream_${id}`];
  }, []);
}

export const Dependences: FC<DependencesProps> = ({ origin, ...dependences }) => {
  const [forwardUpstreamID, backwardUpstreamID, downstreamID] = useID();
  const { forwardUpstream, backwardUpstream, downstream, edgeAttributes } = useDependences(dependences);
  return (
    <>
      {forwardUpstream && forwardUpstream.length > 1 ? (
        <>
          <Node id={forwardUpstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge {...edgeAttributes} targets={[origin, forwardUpstreamID]} dir="none" />
        </>
      ) : null}
      {backwardUpstream && backwardUpstream.length > 1 ? (
        <>
          <Node id={backwardUpstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge {...edgeAttributes} targets={[backwardUpstreamID, origin]} dir="none" />
        </>
      ) : null}
      {downstream && downstream.length > 1 ? (
        <>
          <Node id={downstreamID} shape="point" label="" fixedsize width={0} height={0} />
          <Edge {...edgeAttributes} targets={[origin, downstreamID]} dir="none" constraint={false} />
        </>
      ) : null}
      <ClusterPortal>
        {forwardUpstream
          ? forwardUpstream.map((d) => (
              // eslint-disable-next-line react/jsx-indent
              <Edge
                {...{ ...edgeAttributes, ...d.edgeAttributes }}
                fontsize={12}
                targets={[forwardUpstream.length === 1 ? origin : forwardUpstreamID, d.destination]}
                label={d.description}
                key={`${forwardUpstream.length === 1 ? origin : forwardUpstreamID}-${d.destination}`}
              />
            ))
          : null}
        {backwardUpstream
          ? backwardUpstream.map((d) => (
              // eslint-disable-next-line react/jsx-indent
              <Edge
                {...{ ...edgeAttributes, ...d.edgeAttributes }}
                fontsize={12}
                targets={[d.destination, backwardUpstream.length === 1 ? origin : backwardUpstreamID]}
                label={d.description}
                key={`${d.destination}-${backwardUpstream.length === 1 ? origin : backwardUpstreamID}`}
                dir="back"
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
                key={`${d.destination}-${downstreamID}`}
                constraint={false}
              />
            ))
          : null}
      </ClusterPortal>
    </>
  );
};
