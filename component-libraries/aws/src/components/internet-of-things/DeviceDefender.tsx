import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type DeviceDefenderType = 'device jobs';

function resolveImage(type?: DeviceDefenderType): string {
  switch (type) {
    case 'device jobs':
      return resolveAsset('internet-of-things/DeviceDefender/device-jobs.png');
    default:
      return resolveAsset('internet-of-things/DeviceDefender.png');
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
} & AWSDependences;

export const DeviceDefender: FC<DeviceDefenderProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

DeviceDefender.displayName = 'DeviceDefender';
