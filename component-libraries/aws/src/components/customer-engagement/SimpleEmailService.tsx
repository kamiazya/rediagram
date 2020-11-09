import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const SimpleEmailService: FC<SimpleEmailServiceProps> = ({
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

SimpleEmailService.displayName = 'SimpleEmailService';
