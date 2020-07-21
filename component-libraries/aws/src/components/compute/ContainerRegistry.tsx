import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type ContainerRegistryProps = {
  type?: ContainerRegistryType;
  name: string;
} & HasDependences;

export type ContainerRegistryType = 'Registry' | 'Image';

function resolveImage(type?: ContainerRegistryType): string {
  switch (type) {
    case 'Image':
      return resolve(__dirname, '../../../assets/compute/ContainerRegistry/Image.png');
    case 'Registry':
      return resolve(__dirname, '../../../assets/compute/ContainerRegistry/Registry.png');
    default:
      return resolve(__dirname, '../../../assets/compute/ContainerRegistry.png');
  }
}

function useIcon(type?: ContainerRegistryType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const ContainerRegistry: FC<ContainerRegistryProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ContainerRegistry.displayName = 'ContainerRegistry';
