import React, { FC, useMemo, ReactElement } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { SubLabel } from '../../hooks/service-name';
import { useAWSContext } from '../../hooks/context';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon EventBridge');
      default:
        return SubLabel('EventBridge');
    }
  }
  return undefined;
}
export const EventBridge: FC<EventBridgeProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

EventBridge.displayName = 'EventBridge';
