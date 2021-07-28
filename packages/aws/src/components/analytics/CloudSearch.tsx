import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { resolveAsset } from '../../assets';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type CloudSearchType = 'Search documents';

export type CloudSearchProps = {
  type?: CloudSearchType;
  name: string;
} & AWSDependences;

function resolveImage(type?: CloudSearchType): string {
  switch (type) {
    case 'Search documents':
      return resolveAsset('analytics/CloudSearch/Search-documents.png');
    default:
      return resolveAsset('analytics/CloudSearch.png');
  }
}

function useIcon(type?: CloudSearchType): { path: string; size: number } {
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
        return SubLabel('Amazon CloudSearch');
      default:
        return SubLabel('CloudSearch');
    }
  }
  return undefined;
}

export const CloudSearch: FC<CloudSearchProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

CloudSearch.displayName = 'CloudSearch';
