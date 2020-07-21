import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type DynamoDBType = 'Attribute' | 'Items' | 'Item' | 'Table' | 'Attributes' | 'Global secondary index' | 'DAX';

function resolveImage(type?: DynamoDBType): string {
  switch (type) {
    case 'Attribute':
      return resolve(__dirname, '../../../assets/database/DynamoDB/Attribute.png');
    case 'Items':
      return resolve(__dirname, '../../../assets/database/DynamoDB/Items.png');
    case 'Item':
      return resolve(__dirname, '../../../assets/database/DynamoDB/Item.png');
    case 'Table':
      return resolve(__dirname, '../../../assets/database/DynamoDB/Table.png');
    case 'Attributes':
      return resolve(__dirname, '../../../assets/database/DynamoDB/Attributes.png');
    case 'Global secondary index':
      return resolve(__dirname, '../../../assets/database/DynamoDB/Global-Secondary-Index.png');
    case 'DAX':
      return resolve(__dirname, '../../../assets/database/DynamoDB/DynamoDB-Accelerator.png');
    default:
      return resolve(__dirname, '../../../assets/database/DynamoDB.png');
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
} & HasDependences;

export const DynamoDB: FC<DynamoDBProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

DynamoDB.displayName = 'DynamoDB';
