import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ContainerServiceType = 'Container1' | 'Container2' | 'Container3' | 'Service' | 'Task';

export type ContainerServiceProps = {
  type?: ContainerServiceType;
  name: string;
} & HasDependences;

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

export const ContainerService: FC<ContainerServiceProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ContainerService.displayName = 'ContainerService';
