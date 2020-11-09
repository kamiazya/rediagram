import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type WAFType = 'Filtering rule';

function resolveImage(type?: WAFType): string {
  switch (type) {
    case 'Filtering rule':
      return resolveAsset('security-identity-compliance/WAF/Filtering-rule.png');
    default:
      return resolveAsset('security-identity-compliance/WAF.png');
  }
}

function useIcon(type?: WAFType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type WAFProps = {
  type?: WAFType;
  name: string;
} & AWSDependences;

export const WAF: FC<WAFProps> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};
