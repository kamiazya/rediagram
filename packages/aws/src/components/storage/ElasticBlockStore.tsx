import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Elastic Block Store');
      case 'medium':
        return SubLabel('Elastic Block Store');
      default:
        return SubLabel('EBS');
    }
  }
  return undefined;
}

export const ElasticBlockStore: FC<ElasticBlockStoreProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ElasticBlockStore.displayName = 'ElasticBlockStore';

export const EBS = ElasticBlockStore;
