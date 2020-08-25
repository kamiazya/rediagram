import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type APIGatewayCategory = 'networking-content-delivery' | 'mobile';

export type APIGatewayType = 'Endpoint';

function resolveImage(category: APIGatewayCategory, type?: APIGatewayType): string {
  switch (type) {
    case 'Endpoint':
      return resolve(__dirname, '../../../assets/', category, 'APIGateway/Endpoint.png');
    default:
      return resolve(__dirname, '../../../assets/', category, 'APIGateway.png');
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
} & HasDependences;

export const APIGateway: FC<APIGatewayProps> = ({
  type,
  category = 'networking-content-delivery',
  name,
  upstream,
  downstream,
  children,
}) => {
  useAssertProvider();
  const icon = useIcon(category, type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
