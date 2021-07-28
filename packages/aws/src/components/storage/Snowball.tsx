import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type SnowballType = 'Snowball import-export';

export type SnowballProps = {
  type?: SnowballType;
  name: string;
} & AWSDependences;

function resolveImage(type?: SnowballType): string {
  switch (type) {
    case 'Snowball import-export':
      return resolveAsset('storage/Snowball/Snowball-import-export.png');
    default:
      return resolveAsset('storage/Snowball.png');
  }
}

function useIcon(type?: SnowballType): { path: string; size: number } {
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
        return SubLabel('AWS Snowball');
      default:
        return SubLabel('Snowball');
    }
  }
  return undefined;
}

export const Snowball: FC<SnowballProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Snowball.displayName = 'Snowball';
