import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type RoboMakerType = 'Cloud extensions ROS' | 'Development environment' | 'Fleet management' | 'Simulation';

function resolveImage(type?: RoboMakerType): string {
  switch (type) {
    case 'Cloud extensions ROS':
      return resolve(__dirname, '../../../assets/robotics/RoboMaker/Cloud-extensions-ROS.png');
    case 'Development environment':
      return resolve(__dirname, '../../../assets/robotics/RoboMaker/Development-environment.png');
    case 'Fleet management':
      return resolve(__dirname, '../../../assets/robotics/RoboMaker/Fleet-management.png');
    case 'Simulation':
      return resolve(__dirname, '../../../assets/robotics/RoboMaker/Simulation.png');
    default:
      return resolve(__dirname, '../../../assets/robotics/RoboMaker.png');
  }
}

function useIcon(type?: RoboMakerType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type RoboMakerProps = {
  type?: RoboMakerType;
  name: string;
} & HasDependences;

export const RoboMaker: FC<RoboMakerProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};
