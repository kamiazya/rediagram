import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type SystemProps = {
  title: string;
};

export const System: FC<SystemProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#F1F8E9">
      {children}
    </GCPGroup>
  );
};

System.displayName = 'System';
