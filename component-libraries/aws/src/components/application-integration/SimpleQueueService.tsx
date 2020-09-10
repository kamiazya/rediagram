import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type SimpleQueueServiceType = 'Message' | 'Queue';

export type SimpleQueueServiceProps = {
  type?: SimpleQueueServiceType;
  name: string;
} & HasDependences;

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
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

SimpleQueueService.displayName = 'SimpleQueueService';
