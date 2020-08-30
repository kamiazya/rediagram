import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type IoTAnalyticsType = 'Channel' | 'Data set' | 'Pipeline' | 'Notebook' | 'Data store';

function resolveImage(type?: IoTAnalyticsType): string {
  switch (type) {
    case 'Channel':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTAnalytics/Channel.png');
    case 'Data set':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTAnalytics/Data-set.png');
    case 'Pipeline':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTAnalytics/Pipeline.png');
    case 'Notebook':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTAnalytics/Notebook.png');
    case 'Data store':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTAnalytics/Data-store.png');
    default:
      return resolve(__dirname, '../../../assets/internet-of-things/IoTAnalytics.png');
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
} & HasDependences;

export const IoTAnalytics: FC<IoTAnalyticsProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

IoTAnalytics.displayName = 'IoTAnalytics';
