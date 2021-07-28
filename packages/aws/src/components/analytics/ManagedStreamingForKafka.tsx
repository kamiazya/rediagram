import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Managed Streaming for Apache Kafka');
      case 'medium':
        return SubLabel('Managed Streaming for Apache Kafka');
      default:
        return SubLabel('Apache Kafka');
    }
  }
  return undefined;
}

export const ManagedStreamingForKafka: FC<ManagedStreamingForKafkaProps> = ({ name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon();
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

ManagedStreamingForKafka.displayName = 'ManagedStreamingForKafka';
