import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS Managed Services');
      default:
        return SubLabel('Managed Services');
    }
  }
  return undefined;
}

export const ManagedServices: FC<ManagedServicesProps> = ({
  name,
  category = 'customer-enablement',
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ManagedServices.displayName = 'ManagedServices';
