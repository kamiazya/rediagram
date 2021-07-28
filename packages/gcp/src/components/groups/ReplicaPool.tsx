import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type ReplicaPoolProps = {
  title: string;
};

export const ReplicaPool: FC<ReplicaPoolProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#E0F7FA">
      {children}
    </GCPGroup>
  );
};

ReplicaPool.displayName = 'ReplicaPool';
