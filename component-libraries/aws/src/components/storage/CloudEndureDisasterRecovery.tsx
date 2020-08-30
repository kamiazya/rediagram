import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type CloudEndureDisasterRecoveryProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolve(__dirname, '../../../assets/storage/CloudEndureDisasterRecovery.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const CloudEndureDisasterRecovery: FC<CloudEndureDisasterRecoveryProps> = ({
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

CloudEndureDisasterRecovery.displayName = 'CloudEndureDisasterRecovery';
