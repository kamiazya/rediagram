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
    if (Array.isArray(upstream)) {
      return [
        upstream.map(toDetail).map(({ destination, description, ...options }) => ({
          destination,
          description,
          edgeAttributes: Object.keys(options).length ? build(options) : edgeAttributes,
        })),
        [],
      ];
    }
    return [
      (upstream.forward ?? []).map(toDetail).map(({ destination, description, ...options }) => ({
        destination,
        description,
        edgeAttributes: Object.keys(options).length ? build(options) : edgeAttributes,
      })),
      (upstream.backward ?? []).map(toDetail).map(({ destination, description, ...options }) => ({
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
