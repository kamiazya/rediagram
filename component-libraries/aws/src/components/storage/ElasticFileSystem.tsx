import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Elastic File System');
      case 'medium':
        return SubLabel('Elastic File System');
      default:
        return SubLabel('EFS');
    }
  }
  return undefined;
}

export const ElasticFileSystem: FC<ElasticFileSystemProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ElasticFileSystem.displayName = 'ElasticFileSystem';
