import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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

export const CloudFront: FC<CloudFrontProps> = ({ type, name, upstream, downstream, children, dependencesOption }) => {
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
