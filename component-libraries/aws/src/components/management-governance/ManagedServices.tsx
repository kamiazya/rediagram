import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

type ManagedServicesCategory = 'customer-enablement' | 'management-governance';
export type ManagedServicesProps = {
  category?: ManagedServicesCategory;
  name: string;
} & HasDependences;

function resolveImage(category: ManagedServicesCategory): string {
  return resolve(__dirname, '../../../assets', category, 'ManagedServices.png');
}

function useIcon(category: ManagedServicesCategory): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category),
      size: 56,
    };
  }, [category]);
}

export const ManagedServices: FC<ManagedServicesProps> = ({
  name,
  category = 'customer-enablement',
  children,
  upstream,
  downstream,
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ManagedServices.displayName = 'ManagedServices';
