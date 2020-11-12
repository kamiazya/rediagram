import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';

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

export const SimpleNotificationService: FC<SimpleNotificationServiceProps> = ({
  type,
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

SimpleNotificationService.displayName = 'SimpleNotificationService';
