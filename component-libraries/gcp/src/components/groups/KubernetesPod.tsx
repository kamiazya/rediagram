import React, { FC } from 'react';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPGroup } from '../internal/GCPGroup';

export type KubernetesPodProps = {
  title: string;
};

export const KubernetesPod: FC<KubernetesPodProps> = ({ title, children }) => {
  useAssertProvider();
  return (
    <GCPGroup title={title} fillcolor="#E8F5E9">
      {children}
    </GCPGroup>
  );
};

KubernetesPod.displayName = 'KubernetesPod';
