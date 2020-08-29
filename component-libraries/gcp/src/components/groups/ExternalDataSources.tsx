import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type ExternalDataSourcesProps = {
  title: string;
};

export const ExternalDataSources: FC<ExternalDataSourcesProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#FFF8E1">
      {children}
    </GCPGroup>
  );
};

ExternalDataSources.displayName = 'ExternalDataSources';
