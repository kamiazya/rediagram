import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type InstanceGroupProps = {
  title: string;
};

export const InstanceGroup: FC<InstanceGroupProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#F9FBE7">
      {children}
    </GCPGroup>
  );
};

InstanceGroup.displayName = 'InstanceGroup';
