import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type AccountProps = {
  title: string;
};

export const Account: FC<AccountProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#E8EAF6">
      {children}
    </GCPGroup>
  );
};

Account.displayName = 'Account';
