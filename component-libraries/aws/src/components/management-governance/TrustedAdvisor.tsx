import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type TrustedAdvisorType =
  | 'Checklist cost'
  | 'Checklist performance'
  | 'Checklist security'
  | 'Checklist fault tolerant'
  | 'Checklist';

function resolveImage(type?: TrustedAdvisorType): string {
  switch (type) {
    case 'Checklist cost':
      return resolve(__dirname, '../../../assets/management-governance/TrustedAdvisor/Checklist-cost.png');
    case 'Checklist performance':
      return resolve(__dirname, '../../../assets/management-governance/TrustedAdvisor/Checklist-performance.png');
    case 'Checklist security':
      return resolve(__dirname, '../../../assets/management-governance/TrustedAdvisor/Checklist-security.png');
    case 'Checklist fault tolerant':
      return resolve(__dirname, '../../../assets/management-governance/TrustedAdvisor/Checklist-fault-tolerant.png');
    case 'Checklist':
      return resolve(__dirname, '../../../assets/management-governance/TrustedAdvisor/Checklist.png');
    default:
      return resolve(__dirname, '../../../assets/management-governance/TrustedAdvisor.png');
  }
}

function useIcon(type?: TrustedAdvisorType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type TrustedAdvisorProps = {
  type?: TrustedAdvisorType;
  name: string;
} & HasDependences;

export const TrustedAdvisor: FC<TrustedAdvisorProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
