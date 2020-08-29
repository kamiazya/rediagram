import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type InfrastructureSystemProps = {
  title: string;
};

export const InfrastructureSystem: FC<InfrastructureSystemProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#F3E5F5">
      {children}
    </GCPGroup>
  );
};

InfrastructureSystem.displayName = 'InfrastructureSystem';
