import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type SimpleEmailServiceType = 'Email';

export type SimpleEmailServiceProps = {
  type?: SimpleEmailServiceType;
  name: string;
} & HasDependences;

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

export const SimpleEmailService: FC<SimpleEmailServiceProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

SimpleEmailService.displayName = 'SimpleEmailService';
