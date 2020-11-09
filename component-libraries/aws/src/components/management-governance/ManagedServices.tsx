import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

type ManagedServicesCategory = 'customer-enablement' | 'management-governance';
export type ManagedServicesProps = {
  category?: ManagedServicesCategory;
  name: string;
} & AWSDependences;

function resolveImage(category: ManagedServicesCategory): string {
  return resolveAsset(category, 'ManagedServices.png');
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
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon(category);
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

ManagedServices.displayName = 'ManagedServices';
