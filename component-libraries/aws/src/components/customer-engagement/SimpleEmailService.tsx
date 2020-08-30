import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type SimpleEmailServiceProps = {
  type?: SimpleEmailServiceType;
  name: string;
} & HasDependences;

export type SimpleEmailServiceType = 'Email';

function resolveImage(type?: SimpleEmailServiceType): string {
  switch (type) {
    case 'Email':
      return resolve(__dirname, '../../../assets/customer-engagement/SimpleEmailService/Email.png');
    default:
      return resolve(__dirname, '../../../assets/customer-engagement/SimpleEmailService.png');
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
