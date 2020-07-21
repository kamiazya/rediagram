import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type ElasticBlockStoreProps = {
  type?: ElasticBlockStoreType;
  name: string;
} & HasDependences;

export type ElasticBlockStoreType = 'Snapshot' | 'Volume' | 'Multiple volumes';

function resolveImage(type?: ElasticBlockStoreType): string {
  switch (type) {
    case 'Snapshot':
      return resolve(__dirname, '../../../assets/storage/ElasticBlockStore/Snapshot.png');
    case 'Volume':
      return resolve(__dirname, '../../../assets/storage/ElasticBlockStore/Volume.png');
    case 'Multiple volumes':
      return resolve(__dirname, '../../../assets/storage/ElasticBlockStore/Multiple-volumes.png');
    default:
      return resolve(__dirname, '../../../assets/storage/ElasticBlockStore.png');
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

export const ElasticBlockStore: FC<ElasticBlockStoreProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ElasticBlockStore.displayName = 'ElasticBlockStore';
