import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

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
} & HasDependences;

export const ElastiCache: FC<ElastiCacheProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ElastiCache.displayName = 'ElastiCache';
