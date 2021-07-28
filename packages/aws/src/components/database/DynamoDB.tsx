import React, { FC, ReactElement, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';
import { useAWSContext } from '../../hooks/context';
import { SubLabel } from '../../hooks/service-name';

export type DynamoDBType = 'Attribute' | 'Items' | 'Item' | 'Table' | 'Attributes' | 'Global secondary index' | 'DAX';

function resolveImage(type?: DynamoDBType): string {
  switch (type) {
    case 'Attribute':
      return resolveAsset('database/DynamoDB/Attribute.png');
    case 'Items':
      return resolveAsset('database/DynamoDB/Items.png');
    case 'Item':
      return resolveAsset('database/DynamoDB/Item.png');
    case 'Table':
      return resolveAsset('database/DynamoDB/Table.png');
    case 'Attributes':
      return resolveAsset('database/DynamoDB/Attributes.png');
    case 'Global secondary index':
      return resolveAsset('database/DynamoDB/Global-Secondary-Index.png');
    case 'DAX':
      return resolveAsset('database/DynamoDB/DynamoDB-Accelerator.png');
    default:
      return resolveAsset('database/DynamoDB.png');
  }
}

function useIcon(type?: DynamoDBType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type DynamoDBProps = {
  type?: DynamoDBType;
  name: string;
} & AWSDependences;

function useServiceName(): ReactElement | undefined {
  const { serviceName } = useAWSContext();
  if (serviceName) {
    const type = typeof serviceName === 'object' ? serviceName.type : 'short';
    switch (type) {
      case 'full':
        return SubLabel('Amazon DynamoDB');
      default:
        return SubLabel('DynamoDB');
    }
  }
  return undefined;
}

export const DynamoDB: FC<DynamoDBProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  const subLabel = useServiceName();
  return <IconNode name={name} icon={icon} label={label} subLabel={subLabel} {...dependences} />;
};

DynamoDB.displayName = 'DynamoDB';
