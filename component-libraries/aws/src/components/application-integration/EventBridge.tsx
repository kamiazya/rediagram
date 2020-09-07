import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type EventBridgeType = 'Event' | 'Default' | 'Custom' | 'SaaS';

export type EventBridgeProps = {
  type?: EventBridgeType;
  name: string;
} & HasDependences;

function resolveImage(type?: EventBridgeType): string {
  switch (type) {
    case 'Event':
      return resolve(__dirname, '../../../assets/compute/EventBridge/Event.png');
    case 'Default':
      return resolve(__dirname, '../../../assets/compute/EventBridge/Default.png');
    case 'Custom':
      return resolve(__dirname, '../../../assets/compute/EventBridge/Custom.png');
    case 'SaaS':
      return resolve(__dirname, '../../../assets/compute/EventBridge/SaaS.png');
    default:
      return resolve(__dirname, '../../../assets/compute/EventBridge.png');
  }
}

function useIcon(type?: EventBridgeType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const EventBridge: FC<EventBridgeProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

EventBridge.displayName = 'EventBridge';
