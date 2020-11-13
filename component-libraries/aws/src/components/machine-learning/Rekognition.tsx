import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

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
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon Rekognition');
      default:
        return SubLabel('Rekognition');
    }
  }
  return undefined;
}

export const Rekognition: FC<RekognitionProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Rekognition.displayName = 'Rekognition';
