import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type RegionProps = {
  title: string;
};

export const Region: FC<RegionProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#ECEFF1">
      {children}
    </GCPGroup>
  );
};

Region.displayName = 'Region';
