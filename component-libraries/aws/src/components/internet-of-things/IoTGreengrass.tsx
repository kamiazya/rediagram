import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type IoTGreengrassType = 'Connector';

function resolveImage(type?: IoTGreengrassType): string {
  switch (type) {
    case 'Connector':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTGreengrass/Connector.png');
    default:
      return resolve(__dirname, '../../../assets/internet-of-things/IoTGreengrass.png');
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
} & HasDependences;

export const IoTGreengrass: FC<IoTGreengrassProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

IoTGreengrass.displayName = 'IoTGreengrass';
