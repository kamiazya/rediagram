import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS IoT Device Defender');
      default:
        return SubLabel('IoT Device Defender');
    }
  }
  return undefined;
}

export const DeviceDefender: FC<DeviceDefenderProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

DeviceDefender.displayName = 'DeviceDefender';
