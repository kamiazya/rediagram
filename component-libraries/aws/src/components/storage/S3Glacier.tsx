import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type S3GlacierType = 'Vault' | 'Archive';

export type S3GlacierProps = {
  type?: S3GlacierType;
  name: string;
} & AWSDependences;

function resolveImage(type?: S3GlacierType): string {
  switch (type) {
    case 'Vault':
      return resolveAsset('storage/S3Glacier/Vault.png');
    case 'Archive':
      return resolveAsset('storage/S3Glacier/Archive.png');
    default:
      return resolveAsset('storage/S3Glacier.png');
  }
}

function useIcon(type?: S3GlacierType): { path: string; size: number } {
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
        return SubLabel('Amazon S3 Glacier');
      default:
        return SubLabel('S3 Glacier');
    }
  }
  return undefined;
}

export const S3Glacier: FC<S3GlacierProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

S3Glacier.displayName = 'S3Glacier';
