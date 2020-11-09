import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type IoTAnalyticsType = 'Channel' | 'Data set' | 'Pipeline' | 'Notebook' | 'Data store';

function resolveImage(type?: IoTAnalyticsType): string {
  switch (type) {
    case 'Channel':
      return resolveAsset('internet-of-things/IoTAnalytics/Channel.png');
    case 'Data set':
      return resolveAsset('internet-of-things/IoTAnalytics/Data-set.png');
    case 'Pipeline':
      return resolveAsset('internet-of-things/IoTAnalytics/Pipeline.png');
    case 'Notebook':
      return resolveAsset('internet-of-things/IoTAnalytics/Notebook.png');
    case 'Data store':
      return resolveAsset('internet-of-things/IoTAnalytics/Data-store.png');
    default:
      return resolveAsset('internet-of-things/IoTAnalytics.png');
  }
}

function useIcon(type?: IoTAnalyticsType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type IoTAnalyticsProps = {
  type?: IoTAnalyticsType;
  name: string;
} & AWSDependences;

export const IoTAnalytics: FC<IoTAnalyticsProps> = ({
  type,
  name,
  upstream,
  downstream,
  children,
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

IoTAnalytics.displayName = 'IoTAnalytics';
