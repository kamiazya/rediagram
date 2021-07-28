import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type Route53Type = 'Hosted zone' | 'Route table';

function resolveImage(type?: Route53Type): string {
  switch (type) {
    case 'Hosted zone':
      return resolveAsset('networking-content-delivery/Route53/Hosted-zone.png');
    case 'Route table':
      return resolveAsset('networking-content-delivery/Route53/Route-table.png');
    default:
      return resolveAsset('networking-content-delivery/Route53.png');
  }
}

function useIcon(type?: Route53Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type Route53Props = {
  type?: Route53Type;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Route 53');
      default:
        return SubLabel('Route 53');
    }
  }
  return undefined;
}

export const Route53: FC<Route53Props> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
