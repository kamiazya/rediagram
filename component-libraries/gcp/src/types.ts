import { HasDependences } from '@rediagram/cdk';

type ThemeStyleOption = {
  theme: 'Primary' | 'Optional Primary' | 'Secondary' | 'Optional Secondary' | 'Success' | 'Failure';
};

type ManualOption = {
  theme?: undefined;
  color?: 'blue' | 'gray' | 'red' | 'green' | 'yellow' | 'pink' | 'auto';
  style?: 'dashed';
};

export type StyleOption = ThemeStyleOption | ManualOption;

export type GCPDependences = HasDependences<StyleOption>;
