import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type InspectorType = 'Agent';

function resolveImage(type?: InspectorType): string {
  switch (type) {
    case 'Agent':
      return resolve(__dirname, '../../../assets/security-identity-compliance/Inspector/Agent.png');
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/Inspector.png');
  }
}

function useIcon(type?: InspectorType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type InspectorProps = {
  type?: InspectorType;
  name: string;
} & HasDependences;

export const Inspector: FC<InspectorProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
