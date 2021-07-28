import { HasDependences } from '@rediagram/cdk';

export type StyleOption = {
  color?: 'purple' | 'lipstickA' | 'lipstickB' | 'dell' | 'tiaMaria' | 'monza' | 'governorBay' | 'greenPea' | 'auto';
  style?: 'dashed';
};

export type AWSDependences = HasDependences<StyleOption>;

export type AWSContext = {
  serviceName?:
    | boolean
    | {
        type: 'full' | 'medium' | 'short';
      };
};
