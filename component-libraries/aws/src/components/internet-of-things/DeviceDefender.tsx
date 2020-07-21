import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type DeviceDefenderType = 'device jobs';

function resolveImage(type?: DeviceDefenderType): string {
  switch (type) {
    case 'device jobs':
      return resolve(__dirname, '../../../assets/internet-of-things/DeviceDefender/device-jobs.png');
    default:
      return resolve(__dirname, '../../../assets/internet-of-things/DeviceDefender.png');
  }
}

function useIcon(type?: DeviceDefenderType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type DeviceDefenderProps = {
  type?: DeviceDefenderType;
  name: string;
} & HasDependences;

export const DeviceDefender: FC<DeviceDefenderProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

DeviceDefender.displayName = 'DeviceDefender';
