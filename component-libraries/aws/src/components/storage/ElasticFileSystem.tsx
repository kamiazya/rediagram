import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ElasticFileSystemProps = {
  type?: ElasticFileSystemType;
  name: string;
} & HasDependences;

export type ElasticFileSystemType = 'File system';

function resolveImage(type?: ElasticFileSystemType): string {
  switch (type) {
    case 'File system':
      return resolve(__dirname, '../../../assets/storage/ElasticFileSystem/File-system.png');
    default:
      return resolve(__dirname, '../../../assets/storage/ElasticFileSystem.png');
  }
}

function useIcon(type?: ElasticFileSystemType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const ElasticFileSystem: FC<ElasticFileSystemProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ElasticFileSystem.displayName = 'ElasticFileSystem';
