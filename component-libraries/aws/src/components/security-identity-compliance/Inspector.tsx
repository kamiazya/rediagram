import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type InspectorType = 'Agent';

function resolveImage(type?: InspectorType): string {
  switch (type) {
    case 'Agent':
      return resolveAsset('security-identity-compliance/Inspector/Agent.png');
    default:
      return resolveAsset('security-identity-compliance/Inspector.png');
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
} & AWSDependences;

export const Inspector: FC<InspectorProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};
