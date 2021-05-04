import { ReactElement } from 'react';
import { RediagramRootComponent } from '@rediagram/common';

export interface CommonRediagramFormatMeta {
  dir?: string;
  format?: string;
}

export interface CommonRediagramFormat {
  (): ReactElement<any, RediagramRootComponent>;
  title?: string;
}

export type CRF = CommonRediagramFormat;

export type CommonRediagramFormatModule = {
  default?: CommonRediagramFormatMeta;
} & {
  [name: string]: CommonRediagramFormat;
};
