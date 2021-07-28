import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type KubernetesClusterProps = {
  title: string;
};

export const KubernetesCluster: FC<KubernetesClusterProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#FCE4EC">
      {children}
    </GCPGroup>
  );
};

KubernetesCluster.displayName = 'KubernetesCluster';
