import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type ShieldType = 'Shield Advanced';

function resolveImage(type?: ShieldType): string {
  switch (type) {
    case 'Shield Advanced':
      return resolve(__dirname, '../../../assets/security-identity-compliance/Shield/Shield-Advanced.png');
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/Shield.png');
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
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
