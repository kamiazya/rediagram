import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type SubNetworkProps = {
  title: string;
};

export const SubNetwork: FC<SubNetworkProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#EDE7F6">
      {children}
    </GCPGroup>
  );
};

SubNetwork.displayName = 'SubNetwork';
