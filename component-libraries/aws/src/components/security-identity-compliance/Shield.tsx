import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type ShieldType = 'Shield Advanced';

function resolveImage(type?: ShieldType): string {
  switch (type) {
    case 'Shield Advanced':
      return resolveAsset('security-identity-compliance/Shield/Shield-Advanced.png');
    default:
      return resolveAsset('security-identity-compliance/Shield.png');
  }
}

function useIcon(type?: ShieldType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type ShieldProps = {
  type?: ShieldType;
  name: string;
} & HasDependences;

export const Shield: FC<ShieldProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
