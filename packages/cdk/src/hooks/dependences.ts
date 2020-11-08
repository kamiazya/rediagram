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
  upstream: FormatedDestinationDetail[];
  downstream: FormatedDestinationDetail[];
  edgeAttributes: any;
} {
  const build = useContext(EdgeStyleBuilderContext);
  return {
    upstream: useMemo(
      () =>
        upstream.map(toDetail).map(({ destination, description, ...options }) => ({
          destination,
          description,
          edgeAttributes: build(Object.keys(options).length ? options : dependencesOption),
        })),
      [build, upstream, dependencesOption],
    ),
    downstream: useMemo(
      () =>
        downstream.map(toDetail).map(({ destination, description, ...options }) => ({
          destination,
          description,
          edgeAttributes: build(Object.keys(options).length ? options : dependencesOption),
        })),
      [build, downstream, dependencesOption],
    ),
    edgeAttributes: useMemo(() => build(dependencesOption), [build, dependencesOption]),
  };
}
