import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type ZoneProps = {
  title: string;
};

export const Zone: FC<ZoneProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#FFF3E0">
      {children}
    </GCPGroup>
  );
};

Zone.displayName = 'Zone';
