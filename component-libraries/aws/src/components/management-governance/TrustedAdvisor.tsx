import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type TrustedAdvisorType =
  | 'Checklist cost'
  | 'Checklist performance'
  | 'Checklist security'
  | 'Checklist fault tolerant'
  | 'Checklist';

function resolveImage(type?: TrustedAdvisorType): string {
  switch (type) {
    case 'Checklist cost':
      return resolveAsset('management-governance/TrustedAdvisor/Checklist-cost.png');
    case 'Checklist performance':
      return resolveAsset('management-governance/TrustedAdvisor/Checklist-performance.png');
    case 'Checklist security':
      return resolveAsset('management-governance/TrustedAdvisor/Checklist-security.png');
    case 'Checklist fault tolerant':
      return resolveAsset('management-governance/TrustedAdvisor/Checklist-fault-tolerant.png');
    case 'Checklist':
      return resolveAsset('management-governance/TrustedAdvisor/Checklist.png');
    default:
      return resolveAsset('management-governance/TrustedAdvisor.png');
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
} & AWSDependences;

export const TrustedAdvisor: FC<TrustedAdvisorProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};
