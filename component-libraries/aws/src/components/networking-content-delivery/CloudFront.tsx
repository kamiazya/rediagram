import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type CloudFrontType = 'Download distribution' | 'Edge location' | 'Streaming distribution';

function resolveImage(type?: CloudFrontType): string {
  switch (type) {
    case 'Download distribution':
      return resolve(__dirname, '../../../assets/networking-content-delivery/CloudFront/Download-distribution.png');
    case 'Edge location':
      return resolve(__dirname, '../../../assets/networking-content-delivery/CloudFront/Edge-location.png');
    case 'Streaming distribution':
      return resolve(__dirname, '../../../assets/networking-content-delivery/CloudFront/Streaming-distribution.png');
    default:
      return resolve(__dirname, '../../../assets/networking-content-delivery/CloudFront.png');
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
} & HasDependences;

export const CloudFront: FC<CloudFrontProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
