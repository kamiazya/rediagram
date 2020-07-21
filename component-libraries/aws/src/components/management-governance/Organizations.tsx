import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type OrganizationsType = 'Account' | 'Organizational unit';

function resolveImage(type?: OrganizationsType): string {
  switch (type) {
    case 'Account':
      return resolve(__dirname, '../../../assets/management-governance/Organizations/Account.png');
    case 'Organizational unit':
      return resolve(__dirname, '../../../assets/management-governance/Organizations/Organizational-unit.png');
    default:
      return resolve(__dirname, '../../../assets/management-governance/Organizations.png');
  }
}

function useIcon(type?: OrganizationsType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type OrganizationsProps = {
  type?: OrganizationsType;
  name: string;
} & HasDependences;

export const Organizations: FC<OrganizationsProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
