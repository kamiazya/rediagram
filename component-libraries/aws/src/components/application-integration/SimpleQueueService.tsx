import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';

export type SimpleQueueServiceType = 'Message' | 'Queue';

export type SimpleQueueServiceProps = {
  type?: SimpleQueueServiceType;
  name: string;
} & HasDependences;

function resolveImage(type?: SimpleQueueServiceType): string {
  switch (type) {
    case 'Message':
      return resolveAsset('compute/SimpleQueueService/Message.png');
    case 'Queue':
      return resolveAsset('compute/SimpleQueueService/Queue.png');
    default:
      return resolveAsset('compute/SimpleQueueService.png');
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
