import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type GlueType = 'Crawler' | 'Data catalog';

export type GlueProps = {
  type?: GlueType;
  name: string;
} & AWSDependences;

function resolveImage(type?: GlueType): string {
  switch (type) {
    case 'Crawler':
      return resolveAsset('analytics/Glue/Crawler.png');
    case 'Data catalog':
      return resolveAsset('analytics/Glue/Data-catalog.png');
    default:
      return resolveAsset('analytics/Glue.png');
  }
}

function useIcon(type?: GlueType): { path: string; size: number } {
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
        return SubLabel('AWS Glue');
      default:
        return SubLabel('Glue');
    }
  }
  return undefined;
}

export const Glue: FC<GlueProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Glue.displayName = 'Glue';
