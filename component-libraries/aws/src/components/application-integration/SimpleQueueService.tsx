import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type SimpleQueueServiceProps = {
  type?: SimpleQueueServiceType;
  name: string;
} & HasDependences;

export type SimpleQueueServiceType = 'Message' | 'Queue';

function resolveImage(type?: SimpleQueueServiceType): string {
  switch (type) {
    case 'Message':
      return resolve(__dirname, '../../../assets/compute/SimpleQueueService/Message.png');
    case 'Queue':
      return resolve(__dirname, '../../../assets/compute/SimpleQueueService/Queue.png');
    default:
      return resolve(__dirname, '../../../assets/compute/SimpleQueueService.png');
  }
}

function useIcon(type?: SimpleQueueServiceType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export const SimpleQueueService: FC<SimpleQueueServiceProps> = ({ type, name, children, upstream, downstream }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

SimpleQueueService.displayName = 'SimpleQueueService';
