import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type CloudWatchType = 'Alarm' | 'Rule' | 'Event' | 'Time based event';

function resolveImage(type?: CloudWatchType): string {
  switch (type) {
    case 'Alarm':
      return resolveAsset('management-governance/CloudWatch/Alarm.png');
    case 'Rule':
      return resolveAsset('management-governance/CloudWatch/Rule.png');
    case 'Event':
      return resolveAsset('management-governance/CloudWatch/Event.png');
    case 'Time based event':
      return resolveAsset('management-governance/CloudWatch/Time-based-event.png');
    default:
      return resolveAsset('management-governance/CloudWatch.png');
  }
}

function useIcon(type?: CloudWatchType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type CloudWatchProps = {
  type?: CloudWatchType;
  name: string;
} & AWSDependences;

export const CloudWatch: FC<CloudWatchProps> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
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
