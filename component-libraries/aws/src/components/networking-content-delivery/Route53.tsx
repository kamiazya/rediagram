import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type Route53Type = 'Hosted zone' | 'Route table';

function resolveImage(type?: Route53Type): string {
  switch (type) {
    case 'Hosted zone':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Route53/Hosted-zone.png');
    case 'Route table':
      return resolve(__dirname, '../../../assets/networking-content-delivery/Route53/Route-table.png');
    default:
      return resolve(__dirname, '../../../assets/networking-content-delivery/Route53.png');
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
} & HasDependences;

export const Route53: FC<Route53Props> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
