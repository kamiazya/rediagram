import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

export type Cloud9Type = 'Instance';

function resolveImage(type?: Cloud9Type): string {
  switch (type) {
    case 'Instance':
      return resolveAsset('developer-tools/Cloud9/Instance.png');
    default:
      return resolveAsset('developer-tools/Cloud9.png');
  }
}

function useIcon(type?: Cloud9Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type Cloud9Props = {
  type?: Cloud9Type;
  name: string;
} & AWSDependences;

export const Cloud9: FC<Cloud9Props> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

Cloud9.displayName = 'Cloud9';
