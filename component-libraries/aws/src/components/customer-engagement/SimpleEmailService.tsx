import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type SimpleEmailServiceType = 'Email';

export type SimpleEmailServiceProps = {
  type?: SimpleEmailServiceType;
  name: string;
} & AWSDependences;

function resolveImage(type?: SimpleEmailServiceType): string {
  switch (type) {
    case 'Email':
      return resolveAsset('customer-engagement/SimpleEmailService/Email.png');
    default:
      return resolveAsset('customer-engagement/SimpleEmailService.png');
  }
}

function useIcon(type?: SimpleEmailServiceType): { path: string; size: number } {
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
        return SubLabel('Amazon Simple Email Service');
      case 'medium':
        return SubLabel('Simple Email Service');
      default:
        return SubLabel('SES');
    }
  }
  return undefined;
}

export const SimpleEmailService: FC<SimpleEmailServiceProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

SimpleEmailService.displayName = 'SimpleEmailService';

export const SES = SimpleEmailService;
