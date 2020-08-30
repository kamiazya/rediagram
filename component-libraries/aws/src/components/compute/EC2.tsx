import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { IconNode, HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';

export type EC2Type =
  | 'AMI'
  | 'Auto Scaling'
  | 'Elastic IP address'
  | 'Rescue'
  | 'Instance'
  | 'A1 instance'
  | 'M4 instance'
  | 'R5a instance'
  | 'z1d instance'
  | 'H1 instance'
  | 'Instances'
  | 'T3 instance'
  | 'C5 instance'
  | 'R4 instance'
  | 'P3 instance'
  | 'I3 instance'
  | 'Spot Instance'
  | 'T2 instance'
  | 'C5n instance'
  | 'X1e instance'
  | 'P2 instance'
  | 'D2 instance'
  | 'Instance with CloudWatch'
  | 'M5 instance'
  | 'C4 instance'
  | 'X1 instance'
  | 'G3 instance'
  | 'DB instance'
  | 'M5a instance'
  | 'R5 instance'
  | 'High memory instance'
  | 'F1 instance';

function resolveImage(type?: EC2Type): string {
  switch (type) {
    case 'AMI':
      return resolve(__dirname, '../../../assets/compute/EC2/AMI.png');
    case 'Auto Scaling':
      return resolve(__dirname, '../../../assets/compute/EC2/Auto-Scaling.png');
    case 'Elastic IP address':
      return resolve(__dirname, '../../../assets/compute/EC2/Elastic-IP-address.png');
    case 'Rescue':
      return resolve(__dirname, '../../../assets/compute/EC2/Rescue.png');
    case 'Instance':
      return resolve(__dirname, '../../../assets/compute/EC2/Instance.png');
    case 'A1 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/A1-Instance.png');
    case 'M4 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/M4-Instance.png');
    case 'R5a instance':
      return resolve(__dirname, '../../../assets/compute/EC2/R5a-Instance.png');
    case 'z1d instance':
      return resolve(__dirname, '../../../assets/compute/EC2/z1d-Instance.png');
    case 'H1 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/H1-Instance.png');
    case 'Instances':
      return resolve(__dirname, '../../../assets/compute/EC2/Instances.png');
    case 'T3 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/T3-Instance.png');
    case 'C5 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/C5-Instance.png');
    case 'R4 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/R4-Instance.png');
    case 'P3 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/P3-Instance.png');
    case 'I3 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/I3-Instance.png');
    case 'Spot Instance':
      return resolve(__dirname, '../../../assets/compute/EC2/Spot-Instance.png');
    case 'T2 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/T2-Instance.png');
    case 'C5n instance':
      return resolve(__dirname, '../../../assets/compute/EC2/C5n-Instance.png');
    case 'X1e instance':
      return resolve(__dirname, '../../../assets/compute/EC2/X1e-Instance.png');
    case 'P2 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/P2-Instance.png');
    case 'D2 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/D2-Instance.png');
    case 'Instance with CloudWatch':
      return resolve(__dirname, '../../../assets/compute/EC2/Instance-with-CloudWatch.png');
    case 'M5 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/M5-Instance.png');
    case 'C4 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/C4-Instance.png');
    case 'X1 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/X1-Instance.png');
    case 'G3 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/G3-Instance.png');
    case 'DB instance':
      return resolve(__dirname, '../../../assets/compute/EC2/DB-Instance.png');
    case 'M5a instance':
      return resolve(__dirname, '../../../assets/compute/EC2/M5a-Instance.png');
    case 'R5 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/R5-Instance.png');
    case 'High memory instance':
      return resolve(__dirname, '../../../assets/compute/EC2/High-Memory-Instance.png');
    case 'F1 instance':
      return resolve(__dirname, '../../../assets/compute/EC2/F1-Instance.png');
    default:
      return resolve(__dirname, '../../../assets/compute/EC2.png');
  }
}

function useIcon(type?: EC2Type): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type EC2Props = {
  type?: EC2Type;
  name: string;
} & HasDependences;

export const EC2: FC<EC2Props> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

EC2.displayName = 'EC2';
