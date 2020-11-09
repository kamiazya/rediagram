import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';

export type SimpleQueueServiceType = 'Message' | 'Queue';

export type SimpleQueueServiceProps = {
  type?: SimpleQueueServiceType;
  name: string;
} & AWSDependences;

function resolveImage(type?: SimpleQueueServiceType): string {
  switch (type) {
    case 'Message':
      return resolveAsset('application-integration/SimpleQueueService/Message.png');
    case 'Queue':
      return resolveAsset('application-integration/SimpleQueueService/Queue.png');
    default:
      return resolveAsset('application-integration/SimpleQueueService.png');
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

export const SimpleQueueService: FC<SimpleQueueServiceProps> = ({
  type,
  name,
  children,
  upstream,
  downstream,
  dependencesOption,
}) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return (
    <IconNode
      name={name}
      icon={icon}
      label={label}
      upstream={upstream}
      downstream={downstream}
      dependencesOption={dependencesOption}
    />
  );
};

SimpleQueueService.displayName = 'SimpleQueueService';
