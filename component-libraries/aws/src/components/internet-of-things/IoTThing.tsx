import { resolve } from 'path';
import React, { FC, useMemo } from 'react';
import { HasDependences, useLabelText } from '@rediagram/cdk';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSNode } from '../internal/AWSNode';

export type IoTThingType =
  | 'bank'
  | 'bicycle'
  | 'camera'
  | 'car'
  | 'cart'
  | 'coffee pot'
  | 'door lock'
  | 'factory'
  | 'generic'
  | 'house'
  | 'lightbulb'
  | 'medical emergency'
  | 'police emergency'
  | 'thermostat'
  | 'travel'
  | 'utility'
  | 'windfarm';

function resolveImage(type: IoTThingType): string {
  switch (type) {
    case 'bicycle':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/bank.png');
    case 'camera':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/bicycle.png');
    case 'car':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/camera.png');
    case 'cart':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/car.png');
    case 'coffee pot':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/cart.png');
    case 'door lock':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/coffee-pot.png');
    case 'factory':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/door-lock.png');
    case 'generic':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/factory.png');
    case 'house':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/generic.png');
    case 'lightbulb':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/house.png');
    case 'medical emergency':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/lightbulb.png');
    case 'police emergency':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/medical-emergency.png');
    case 'thermostat':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/police-emergency.png');
    case 'travel':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/thermostat.png');
    case 'utility':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/travel.png');
    case 'windfarm':
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/utility.png');
    case 'bank':
    default:
      return resolve(__dirname, '../../../assets/internet-of-things/IoTThing/bank.png');
  }
}

function useIcon(type: IoTThingType): { path: string; size: number } {
  return useMemo(() => {
    return {
      path: resolveImage(type),
      size: type === undefined ? 56 : 37,
    };
  }, [type]);
}

export type IoTThingProps = {
  type: IoTThingType;
  name: string;
} & HasDependences;

export const IoTThing: FC<IoTThingProps> = ({ type, name, upstream, downstream, children }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <AWSNode name={name} icon={icon} label={label} upstream={upstream} downstream={downstream} />;
};

IoTThing.displayName = 'IoTThing';
