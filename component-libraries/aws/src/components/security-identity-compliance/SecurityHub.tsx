import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type SecurityHubType = 'Finding';

function resolveImage(type?: SecurityHubType): string {
  switch (type) {
    case 'Finding':
      return resolve(__dirname, '../../../assets/security-identity-compliance/SecurityHub/Finding.png');
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/SecurityHub.png');
  }
}

function useIcon(type?: SecurityHubType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type SecurityHubProps = {
  type?: SecurityHubType;
  name: string;
} & HasDependences;

export const SecurityHub: FC<SecurityHubProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
