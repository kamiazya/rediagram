import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type OrganizationsType = 'Account' | 'Organizational unit';

function resolveImage(type?: OrganizationsType): string {
  switch (type) {
    case 'Account':
      return resolveAsset('management-governance/Organizations/Account.png');
    case 'Organizational unit':
      return resolveAsset('management-governance/Organizations/Organizational-unit.png');
    default:
      return resolveAsset('management-governance/Organizations.png');
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
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
