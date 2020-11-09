import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type ElasticFileSystemType = 'File system';

export type ElasticFileSystemProps = {
  type?: ElasticFileSystemType;
  name: string;
} & AWSDependences;

function resolveImage(type?: ElasticFileSystemType): string {
  switch (type) {
    case 'File system':
      return resolveAsset('storage/ElasticFileSystem/File-system.png');
    default:
      return resolveAsset('storage/ElasticFileSystem.png');
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

export const ElasticFileSystem: FC<ElasticFileSystemProps> = ({
  type,
  name,
  upstream,
  downstream,
  children,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};

ElasticFileSystem.displayName = 'ElasticFileSystem';
