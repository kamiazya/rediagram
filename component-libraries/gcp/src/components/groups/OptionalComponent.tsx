import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type OptionalComponentProps = {
  title: string;
};

export const OptionalComponent: FC<OptionalComponentProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="none" color="#4284F3" style="dashed">
      {children}
    </GCPGroup>
  );
};

OptionalComponent.displayName = 'OptionalComponent';
