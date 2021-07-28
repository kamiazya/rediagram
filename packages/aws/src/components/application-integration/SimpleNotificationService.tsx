import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type SimpleNotificationServiceType = 'Email notification' | 'HTTP notification' | 'Topic';

export type SimpleNotificationServiceProps = {
  type?: SimpleNotificationServiceType;
  name: string;
} & AWSDependences;

function resolveImage(type?: SimpleNotificationServiceType): string {
  switch (type) {
    case 'Email notification':
      return resolveAsset('application-integration/SimpleNotificationService/Email-notification.png');
    case 'HTTP notification':
      return resolveAsset('application-integration/SimpleNotificationService/HTTP-notification.png');
    case 'Topic':
      return resolveAsset('application-integration/SimpleNotificationService/Topic.png');
    default:
      return resolveAsset('application-integration/SimpleNotificationService.png');
  }
}

function useIcon(type?: SimpleNotificationServiceType): { path: string; size: number } {
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
        return SubLabel('Amazon Simple Notification Service');
      case 'medium':
        return SubLabel('Simple Notification Service');
      default:
        return SubLabel('SNS');
    }
  }
  return undefined;
}

export const SimpleNotificationService: FC<SimpleNotificationServiceProps> = ({
  type,
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

SimpleNotificationService.displayName = 'SimpleNotificationService';

export const SNS = SimpleNotificationService;
