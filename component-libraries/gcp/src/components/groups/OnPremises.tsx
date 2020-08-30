import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type OnPremisesProps = {
  title: string;
};

export const OnPremises: FC<OnPremisesProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#EFEBE9">
      {children}
    </GCPGroup>
  );
};

OnPremises.displayName = 'OnPremises';
