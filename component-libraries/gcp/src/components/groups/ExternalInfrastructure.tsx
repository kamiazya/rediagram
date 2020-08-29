import React, { FC, useMemo } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type ExternalInfrastructureProps = {
  title: string;
  type: '1st' | '3rd';
};

function useStyle(type: '1st' | '3rd'): string {
  // eslint-disable-next-line consistent-return
  return useMemo(() => {
    // eslint-disable-next-line default-case
    switch (type) {
      case '1st':
        return '#E1F5FE';
      case '3rd':
        return '#E0F2F1';
    }
  }, [type]);
}

export const ExternalInfrastructure: FC<ExternalInfrastructureProps> = ({ title, type, children }) => {
  useAssertProvider();
  const color = useStyle(type);
  return (
    <GCPGroup title={title} fillcolor={color}>
      {children}
    </GCPGroup>
  );
};

ExternalInfrastructure.displayName = 'ExternalInfrastructure';
