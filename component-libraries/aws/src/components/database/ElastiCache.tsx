import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type ElastiCacheType = 'Cache node' | 'Redis' | 'Memcached';

function resolveImage(type?: ElastiCacheType): string {
  switch (type) {
    case 'Cache node':
      return resolve(__dirname, '../../../assets/database/ElastiCache/Cache-node.png');
    case 'Redis':
      return resolve(__dirname, '../../../assets/database/ElastiCache/Redis.png');
    case 'Memcached':
      return resolve(__dirname, '../../../assets/database/ElastiCache/Memcached.png');
    default:
      return resolve(__dirname, '../../../assets/database/ElastiCache.png');
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
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ElastiCache.displayName = 'ElastiCache';
