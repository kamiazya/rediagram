import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type FirewallProps = {
  title: string;
};

export const Firewall: FC<FirewallProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#FBE9E7">
      {children}
    </GCPGroup>
  );
};

Firewall.displayName = 'Firewall';
