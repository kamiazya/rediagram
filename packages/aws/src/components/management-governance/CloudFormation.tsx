import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type CloudFormationType = 'Change set' | 'Stack' | 'Template';

function resolveImage(type?: CloudFormationType): string {
  switch (type) {
    case 'Change set':
      return resolveAsset('management-governance/CloudFormation/Change-set.png');
    case 'Stack':
      return resolveAsset('management-governance/CloudFormation/Stack.png');
    case 'Template':
      return resolveAsset('management-governance/CloudFormation/Template.png');
    default:
      return resolveAsset('management-governance/CloudFormation.png');
  }
}

function useIcon(type?: CloudFormationType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type CloudFormationProps = {
  type?: CloudFormationType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('AWS CloudFormation');
      default:
        return SubLabel('CloudFormation');
    }
  }
  return undefined;
}

export const CloudFormation: FC<CloudFormationProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
