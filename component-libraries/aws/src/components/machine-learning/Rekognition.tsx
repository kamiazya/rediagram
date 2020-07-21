import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type RekognitionType = 'Image' | 'Video';

function resolveImage(type?: RekognitionType): string {
  switch (type) {
    case 'Image':
      return resolve(__dirname, '../../../assets/internet-of-things/Rekognition/Image.png');
    case 'Video':
      return resolve(__dirname, '../../../assets/internet-of-things/Rekognition/Video.png');
    default:
      return resolve(__dirname, '../../../assets/internet-of-things/Rekognition.png');
  }
}

function useIcon(type?: RekognitionType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type RekognitionProps = {
  type?: RekognitionType;
  name: string;
} & HasDependences;

export const Rekognition: FC<RekognitionProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Rekognition.displayName = 'Rekognition';
