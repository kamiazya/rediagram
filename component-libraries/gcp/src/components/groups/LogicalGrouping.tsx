import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type LogicalGroupingProps = {
  title: string;
};

export const LogicalGrouping: FC<LogicalGroupingProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#E3F2FD">
      {children}
    </GCPGroup>
  );
};

LogicalGrouping.displayName = 'LogicalGrouping';
