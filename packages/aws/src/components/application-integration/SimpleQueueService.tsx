import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Simple Queue Service');
      case 'medium':
        return SubLabel('Simple Queue Service');
      default:
        return SubLabel('SQS');
    }
  }
  return undefined;
}

export const SimpleQueueService: FC<SimpleQueueServiceProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

SimpleQueueService.displayName = 'SimpleQueueService';

export const SQS = SimpleQueueService;
