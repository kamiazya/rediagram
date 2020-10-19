import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ManagedApacheCassandraServiceProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolveAsset('database/ManagedApacheCassandraService.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const ManagedApacheCassandraService: FC<ManagedApacheCassandraServiceProps> = ({
  name,
  children,
  upstream,
  downstream,
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

ManagedApacheCassandraService.displayName = 'ManagedApacheCassandraService';
