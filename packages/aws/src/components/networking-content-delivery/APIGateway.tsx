import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type APIGatewayCategory = 'networking-content-delivery' | 'mobile';

export type APIGatewayType = 'Endpoint';

function resolveImage(category: APIGatewayCategory, type?: APIGatewayType): string {
  switch (type) {
    case 'Endpoint':
      return resolveAsset('', category, 'APIGateway/Endpoint.png');
    default:
      return resolveAsset('', category, 'APIGateway.png');
  }
}

function useIcon(category: APIGatewayCategory, type?: APIGatewayType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(category, type),
      size: type === undefined ? 56 : 37,
    };
  }, [type, category]);
}

export type APIGatewayProps = {
  category?: APIGatewayCategory;
  type?: APIGatewayType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon API Gateway');
      default:
        return SubLabel('API Gateway');
    }
  }
  return undefined;
}

export const APIGateway: FC<APIGatewayProps> = ({
  type,
  category = 'networking-content-delivery',
  name,
  children,
  ...dependences
}) => {
  useAssertProvider();
  const icon = useIcon(category, type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};
