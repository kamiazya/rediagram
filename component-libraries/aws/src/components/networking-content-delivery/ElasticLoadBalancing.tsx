import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type ElasticLoadBalancingType = 'Application load balancer' | 'Classic load balancer' | 'Network load balancer';

function resolveImage(type?: ElasticLoadBalancingType): string {
  switch (type) {
    case 'Application load balancer':
      return resolve(
        __dirname,
        '../../../assets/networking-content-delivery/ElasticLoadBalancing/Application-load-balancer.png',
      );
    case 'Classic load balancer':
      return resolve(
        __dirname,
        '../../../assets/networking-content-delivery/ElasticLoadBalancing/Classic-load-balancer.png',
      );
    case 'Network load balancer':
      return resolve(
        __dirname,
        '../../../assets/networking-content-delivery/ElasticLoadBalancing/Network-load-balancer.png',
      );
    default:
      return resolve(__dirname, '../../../assets/networking-content-delivery/ElasticLoadBalancing.png');
  }
}

function useIcon(type?: ElasticLoadBalancingType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type ElasticLoadBalancingProps = {
  type?: ElasticLoadBalancingType;
  name: string;
} & HasDependences;

export const ElasticLoadBalancing: FC<ElasticLoadBalancingProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
