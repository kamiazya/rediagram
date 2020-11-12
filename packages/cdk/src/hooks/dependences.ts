import { ReactElement, useContext, useMemo } from 'react';
import { HasDependences } from '../components/Dependence';
import { EdgeStyleBuilderContext } from '../contexts/EdgeStyleBuilderContext';
import { Destination, DestinationDetail } from '../types';

type FormatedDestinationDetail = {
  destination: string;
  description?: string | ReactElement;
  edgeAttributes: any;
};

function toDetail<T extends Record<string, unknown>>(destination: Destination<T>): DestinationDetail<T> {
  return typeof destination === 'string' ? ({ destination } as DestinationDetail<T>) : destination;
}

const scatter = <T>(array: readonly T[], getIndex: (cur: T, idx: number, src: readonly T[]) => number) =>
  array.reduce((result, cur, idx, src) => {
    const i = getIndex(cur, idx, src) || 0;
    // eslint-disable-next-line no-param-reassign
    if (i >= 0) (result[i] || (result[i] = [])).push(cur);
    return result;
  }, [] as T[][]);

export function useDependences<T extends Record<string, unknown>>({
  upstream = [],
  downstream = [],
  dependencesOption,
}: HasDependences<T>): {
  forwardUpstream: FormatedDestinationDetail[];
  backwardUpstream: FormatedDestinationDetail[];
  downstream: FormatedDestinationDetail[];
  edgeAttributes: any;
} {
  const build = useContext(EdgeStyleBuilderContext);
  const edgeAttributes = useMemo(() => build(dependencesOption), [build, dependencesOption]);
  const [forwardUpstream, backwardUpstream] = useMemo(() => {
    const [forward = [], backward = []] = scatter(upstream.map(toDetail), ({ position }) =>
      position === 'backward' ? 1 : 0,
    );
    return [
      forward.map(({ destination, description, ...options }) => ({
        destination,
        description,
        edgeAttributes: Object.keys(options).length ? build(options) : edgeAttributes,
      })),
      backward.map(({ destination, description, ...options }) => ({
        destination,
        description,
        edgeAttributes: Object.keys(options).length ? build(options) : edgeAttributes,
      })),
    ];
  }, [build, upstream, edgeAttributes]);
  return {
    forwardUpstream,
    backwardUpstream,
    downstream: useMemo(
      () =>
        downstream.map(toDetail).map(({ destination, description, ...options }) => ({
          destination,
          description,
          edgeAttributes: Object.keys(options).length ? build(options) : edgeAttributes,
        })),
      [build, downstream, edgeAttributes],
    ),
    edgeAttributes,
  };
}
