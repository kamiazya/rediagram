import { HasDependences } from '@rediagram/cdk';
import { ReactElement } from 'react';

export type FirebaseDependences = HasDependences;

export type Type = 'light' | 'icon';

export type Props = {
  label?: string | ReactElement;
  name: string;
  type?: Type;
} & FirebaseDependences;

export type FirebaseContext = {
  defaultType: Type;
  serviceName:
    | boolean
    | {
        type: 'full' | 'medium' | 'short';
      };
};

export type StyleOption = {
  color?: 'blue' | 'navy' | 'coral' | 'gray';
  style?: 'dashed';
};
