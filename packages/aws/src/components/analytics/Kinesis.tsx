import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type KinesisType = 'Video Streams' | 'Data Streams' | 'Data Firehose' | 'Data Analytics';

export type KinesisProps = {
  name: string;
  type?: KinesisType;
} & AWSDependences;

function resolveImage(type?: KinesisType): string {
  switch (type) {
    case 'Video Streams':
      return resolveAsset('analytics/Kinesis/Video-Streams.png');
    case 'Data Streams':
      return resolveAsset('analytics/Kinesis/Data-Streams.png');
    case 'Data Firehose':
      return resolveAsset('analytics/Kinesis/Data-Firehose.png');
    case 'Data Analytics':
      return resolveAsset('analytics/Kinesis/Data-Analytics.png');
    default:
      return resolveAsset('analytics/Kinesis.png');
  }
}

function useIcon(type?: KinesisType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: 56,
    };
  }, [type]);
}

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Kinesis');
      default:
        return SubLabel('Kinesis');
    }
  }
  return undefined;
}

export const Kinesis: FC<KinesisProps> = ({ name, type, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Kinesis.displayName = 'Kinesis';
