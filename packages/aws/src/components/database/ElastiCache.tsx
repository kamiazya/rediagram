import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type ElastiCacheType = 'Cache node' | 'Redis' | 'Memcached';

function resolveImage(type?: ElastiCacheType): string {
  switch (type) {
    case 'Cache node':
      return resolveAsset('database/ElastiCache/Cache-node.png');
    case 'Redis':
      return resolveAsset('database/ElastiCache/Redis.png');
    case 'Memcached':
      return resolveAsset('database/ElastiCache/Memcached.png');
    default:
      return resolveAsset('database/ElastiCache.png');
  }
}

function useIcon(type?: ElastiCacheType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type ElastiCacheProps = {
  type?: ElastiCacheType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon ElastiCache');
      default:
        return SubLabel('ElastiCache');
    }
  }
  return undefined;
}

export const ElastiCache: FC<ElastiCacheProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ElastiCache.displayName = 'ElastiCache';
