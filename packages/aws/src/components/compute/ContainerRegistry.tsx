import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Elastic Container Registry');
      case 'medium':
        return SubLabel('Elastic Container Registry');
      default:
        return SubLabel('ECR');
    }
  }
  return undefined;
}

export const ContainerRegistry: FC<ContainerRegistryProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ContainerRegistry.displayName = 'ContainerRegistry';

export const ECR = ContainerRegistry;
