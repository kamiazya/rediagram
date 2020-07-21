import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type CloudWatchType = 'Alarm' | 'Rule' | 'Event' | 'Time based event';

function resolveImage(type?: CloudWatchType): string {
  switch (type) {
    case 'Alarm':
      return resolve(__dirname, '../../../assets/management-governance/CloudWatch/Alarm.png');
    case 'Rule':
      return resolve(__dirname, '../../../assets/management-governance/CloudWatch/Rule.png');
    case 'Event':
      return resolve(__dirname, '../../../assets/management-governance/CloudWatch/Event.png');
    case 'Time based event':
      return resolve(__dirname, '../../../assets/management-governance/CloudWatch/Time-based-event.png');
    default:
      return resolve(__dirname, '../../../assets/management-governance/CloudWatch.png');
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
} & HasDependences;

export const CloudWatch: FC<CloudWatchProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
