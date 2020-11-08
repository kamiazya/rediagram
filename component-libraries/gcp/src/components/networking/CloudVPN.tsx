import React, { FC, useMemo } from 'react';
import { useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { GCPNode } from '../internal/GCPNode';
import { GCPDependences } from '../../types';

export type CloudVPNProps = {
  name: string;
  description?: string;
} & GCPDependences;

function resolveImage(): string {
  return resolveAsset('networking/CloudVPN.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 40,
    };
  }, []);
}

export const CloudVPN: FC<CloudVPNProps> = ({
  name,
  description,
  children,
  upstream,
  downstream,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <GCPNode
      service="Cloud VPN"
      name={name}
      description={description}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};

CloudVPN.displayName = 'CloudVPN';
