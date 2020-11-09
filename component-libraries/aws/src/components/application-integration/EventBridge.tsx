import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';

export type EventBridgeType = 'Event' | 'Default' | 'Custom' | 'SaaS';

export type EventBridgeProps = {
  type?: EventBridgeType;
  name: string;
} & AWSDependences;

function resolveImage(type?: EventBridgeType): string {
  switch (type) {
    case 'Event':
      return resolveAsset('application-integration/EventBridge/Event.png');
    case 'Default':
      return resolveAsset('application-integration/EventBridge/Default.png');
    case 'Custom':
      return resolveAsset('application-integration/EventBridge/Custom.png');
    case 'SaaS':
      return resolveAsset('application-integration/EventBridge/SaaS.png');
    default:
      return resolveAsset('application-integration/EventBridge.png');
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

export const EventBridge: FC<EventBridgeProps> = ({
  type,
  name,
  children,
  upstream,
  downstream,
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

EventBridge.displayName = 'EventBridge';
