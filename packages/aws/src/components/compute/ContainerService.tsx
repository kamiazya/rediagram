import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type ContainerServiceType = 'Container1' | 'Container2' | 'Container3' | 'Service' | 'Task';

export type ContainerServiceProps = {
  type?: ContainerServiceType;
  name: string;
} & AWSDependences;

function resolveImage(type?: ContainerServiceType): string {
  switch (type) {
    case 'Container1':
      return resolveAsset('compute/ContainerService/Container1.png');
    case 'Container2':
      return resolveAsset('compute/ContainerService/Container2.png');
    case 'Container3':
      return resolveAsset('compute/ContainerService/Container3.png');
    case 'Service':
      return resolveAsset('compute/ContainerService/Service.png');
    case 'Task':
      return resolveAsset('compute/ContainerService/Task.png');
    default:
      return resolveAsset('compute/ContainerService.png');
  }
}

function useIcon(type?: ContainerServiceType): { path: string; size: number } {
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
        return SubLabel('Amazon Elastic Container Service');
      case 'medium':
        return SubLabel('Elastic Container Service');
      default:
        return SubLabel('ECS');
    }
  }
  return undefined;
}
export const ContainerService: FC<ContainerServiceProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ContainerService.displayName = 'ContainerService';

export const ECS = ContainerService;
