import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const Route53: FC<Route53Props> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
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
