import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type LambdaType = 'Lambda Function';

export type LambdaProps = {
  type?: LambdaType;
  name: string;
} & AWSDependences;

function resolveImage(type?: LambdaType): string {
  switch (type) {
    case 'Lambda Function':
      return resolveAsset('compute/Lambda/Lambda-Function.png');
    default:
      return resolveAsset('compute/Lambda.png');
  }
}

function useIcon(type?: LambdaType): { path: string; size: number } {
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
        return SubLabel('AWS Lambda');
      default:
        return SubLabel('Lambda');
    }
  }
  return undefined;
}

export const Lambda: FC<LambdaProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

Lambda.displayName = 'Lambda';
