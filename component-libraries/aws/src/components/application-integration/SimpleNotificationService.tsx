import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type SimpleNotificationServiceProps = {
  type?: SimpleNotificationServiceType;
  name: string;
} & HasDependences;

export type SimpleNotificationServiceType = 'Email notification' | 'HTTP notification' | 'Topic';

function resolveImage(type?: SimpleNotificationServiceType): string {
  switch (type) {
    case 'Email notification':
      return resolve(__dirname, '../../../assets/compute/SimpleNotificationService/Email-notification.png');
    case 'HTTP notification':
      return resolve(__dirname, '../../../assets/compute/SimpleNotificationService/HTTP-notification.png');
    case 'Topic':
      return resolve(__dirname, '../../../assets/compute/SimpleNotificationService/Topic.png');
    default:
      return resolve(__dirname, '../../../assets/compute/SimpleNotificationService.png');
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
  upstream,
  downstream,
}) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

SimpleNotificationService.displayName = 'SimpleNotificationService';
