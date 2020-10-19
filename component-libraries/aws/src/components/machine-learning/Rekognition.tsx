import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';

export type RekognitionType = 'Image' | 'Video';

function resolveImage(type?: RekognitionType): string {
  switch (type) {
    case 'Image':
      return resolveAsset('internet-of-things/Rekognition/Image.png');
    case 'Video':
      return resolveAsset('internet-of-things/Rekognition/Video.png');
    default:
      return resolveAsset('internet-of-things/Rekognition.png');
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
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

Rekognition.displayName = 'Rekognition';
