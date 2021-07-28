import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type WAFType = 'Filtering rule';

function resolveImage(type?: WAFType): string {
  switch (type) {
    case 'Filtering rule':
      return resolveAsset('security-identity-compliance/WAF/Filtering-rule.png');
    default:
      return resolveAsset('security-identity-compliance/WAF.png');
  }
}

function useIcon(type?: WAFType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type WAFProps = {
  type?: WAFType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS WAF');
      default:
        return SubLabel('WAF');
    }
  }
  return undefined;
}

export const WAF: FC<WAFProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
