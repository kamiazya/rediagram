import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type ContainerRegistryType = 'Registry' | 'Image';

export type ContainerRegistryProps = {
  type?: ContainerRegistryType;
  name: string;
} & AWSDependences;

function resolveImage(type?: ContainerRegistryType): string {
  switch (type) {
    case 'Image':
      return resolveAsset('compute/ContainerRegistry/Image.png');
    case 'Registry':
      return resolveAsset('compute/ContainerRegistry/Registry.png');
    default:
      return resolveAsset('compute/ContainerRegistry.png');
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

export const ContainerRegistry: FC<ContainerRegistryProps> = ({
  type,
  name,
  children,
  upstream,
  downstream,
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

ContainerRegistry.displayName = 'ContainerRegistry';
