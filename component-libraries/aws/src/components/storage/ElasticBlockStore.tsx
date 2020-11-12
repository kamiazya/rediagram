import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type ElasticBlockStoreType = 'Snapshot' | 'Volume' | 'Multiple volumes';

export type ElasticBlockStoreProps = {
  type?: ElasticBlockStoreType;
  name: string;
} & AWSDependences;

function resolveImage(type?: ElasticBlockStoreType): string {
  switch (type) {
    case 'Snapshot':
      return resolveAsset('storage/ElasticBlockStore/Snapshot.png');
    case 'Volume':
      return resolveAsset('storage/ElasticBlockStore/Volume.png');
    case 'Multiple volumes':
      return resolveAsset('storage/ElasticBlockStore/Multiple-volumes.png');
    default:
      return resolveAsset('storage/ElasticBlockStore.png');
  }
}

function useIcon(type?: ElasticBlockStoreType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const ElasticBlockStore: FC<ElasticBlockStoreProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

ElasticBlockStore.displayName = 'ElasticBlockStore';
