import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type ExternalSaaSProvidersProps = {
  title: string;
};

export const ExternalSaaSProviders: FC<ExternalSaaSProvidersProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#FFEBEE">
      {children}
    </GCPGroup>
  );
};

ExternalSaaSProviders.displayName = 'ExternalSaaSProviders';
