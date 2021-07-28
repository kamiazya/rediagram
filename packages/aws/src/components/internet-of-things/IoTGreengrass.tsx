import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type IoTGreengrassType = 'Connector';

function resolveImage(type?: IoTGreengrassType): string {
  switch (type) {
    case 'Connector':
      return resolveAsset('internet-of-things/IoTGreengrass/Connector.png');
    default:
      return resolveAsset('internet-of-things/IoTGreengrass.png');
  }
}

function useIcon(type?: IoTGreengrassType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type IoTGreengrassProps = {
  type?: IoTGreengrassType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS IoT Greengrass');
      default:
        return SubLabel('IoT Greengrass');
    }
  }
  return undefined;
}

export const IoTGreengrass: FC<IoTGreengrassProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

IoTGreengrass.displayName = 'IoTGreengrass';
