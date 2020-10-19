import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type ManagedStreamingForKafkaProps = {
  name: string;
} & HasDependences;

function resolveImage(): string {
  return resolveAsset('analytics/ManagedStreamingForKafka.png');
}

function useIcon(): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(),
      size: 56,
    };
  }, []);
}

export const ManagedStreamingForKafka: FC<ManagedStreamingForKafkaProps> = ({
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

ManagedStreamingForKafka.displayName = 'ManagedStreamingForKafka';
