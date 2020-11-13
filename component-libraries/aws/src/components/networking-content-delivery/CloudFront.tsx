import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type CloudFrontType = 'Download distribution' | 'Edge location' | 'Streaming distribution';

function resolveImage(type?: CloudFrontType): string {
  switch (type) {
    case 'Download distribution':
      return resolveAsset('networking-content-delivery/CloudFront/Download-distribution.png');
    case 'Edge location':
      return resolveAsset('networking-content-delivery/CloudFront/Edge-location.png');
    case 'Streaming distribution':
      return resolveAsset('networking-content-delivery/CloudFront/Streaming-distribution.png');
    default:
      return resolveAsset('networking-content-delivery/CloudFront.png');
  }
}

function useIcon(type?: CloudFrontType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type CloudFrontProps = {
  type?: CloudFrontType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon CloudFront');
      default:
        return SubLabel('CloudFront');
    }
  }
  return undefined;
}

export const CloudFront: FC<CloudFrontProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
