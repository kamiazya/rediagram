import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type WAFType = 'Filtering rule';

function resolveImage(type?: WAFType): string {
  switch (type) {
    case 'Filtering rule':
      return resolve(__dirname, '../../../assets/security-identity-compliance/WAF/Filtering-rule.png');
    default:
      return resolve(__dirname, '../../../assets/security-identity-compliance/WAF.png');
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
} & HasDependences;

export const WAF: FC<WAFProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
