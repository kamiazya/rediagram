import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type KinesisProps = {
  name: string;
  type?: KinesisType;
} & HasDependences;

export type KinesisType = 'Video Streams' | 'Data Streams' | 'Data Firehose' | 'Data Analytics';

function resolveImage(type?: KinesisType): string {
  switch (type) {
    case 'Video Streams':
      return resolve(__dirname, '../../../assets/analytics/Kinesis/Video-Streams.png');
    case 'Data Streams':
      return resolve(__dirname, '../../../assets/analytics/Kinesis/Data-Streams.png');
    case 'Data Firehose':
      return resolve(__dirname, '../../../assets/analytics/Kinesis/Data-Firehose.png');
    case 'Data Analytics':
      return resolve(__dirname, '../../../assets/analytics/Kinesis/Data-Analytics.png');
    default:
      return resolve(__dirname, '../../../assets/analytics/Kinesis.png');
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

export const Kinesis: FC<KinesisProps> = ({ name, type, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Kinesis.displayName = 'Kinesis';
