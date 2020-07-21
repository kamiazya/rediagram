import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type ContainerServiceProps = {
  type?: ContainerServiceType;
  name: string;
} & HasDependences;

export type ContainerServiceType = 'Container1' | 'Container2' | 'Container3' | 'Service' | 'Task';

function resolveImage(type?: ContainerServiceType): string {
  switch (type) {
    case 'Container1':
      return resolve(__dirname, '../../../assets/compute/ContainerService/Container1.png');
    case 'Container2':
      return resolve(__dirname, '../../../assets/compute/ContainerService/Container2.png');
    case 'Container3':
      return resolve(__dirname, '../../../assets/compute/ContainerService/Container3.png');
    case 'Service':
      return resolve(__dirname, '../../../assets/compute/ContainerService/Service.png');
    case 'Task':
      return resolve(__dirname, '../../../assets/compute/ContainerService/Task.png');
    default:
      return resolve(__dirname, '../../../assets/compute/ContainerService.png');
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
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ContainerService.displayName = 'ContainerService';
