import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type S3Type = 'Bucket with Objects' | 'Bucket' | 'Object';

export type S3Props = {
  type?: S3Type;
  name: string;
} & AWSDependences;

function resolveImage(type?: S3Type): string {
  switch (type) {
    case 'Bucket with Objects':
      return resolveAsset('storage/S3/Bucket-with-Objects.png');
    case 'Bucket':
      return resolveAsset('storage/S3/Bucket.png');
    case 'Object':
      return resolveAsset('storage/S3/Object.png');
    default:
      return resolveAsset('storage/S3.png');
  }
}

function useIcon(type?: S3Type): { path: string; size: number } {
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
        return SubLabel('Amazon Simple Storage Service');
      default:
        return SubLabel('S3');
    }
  }
  return undefined;
}

export const S3: FC<S3Props> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

S3.displayName = 'S3';
