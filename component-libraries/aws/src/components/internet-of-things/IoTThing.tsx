import React, { FC, useMemo } from 'react';
import { IconNode, useLabelText } from '@rediagram/cdk';
import { resolveAsset } from '../../assets';
import { useAssertProvider } from '../../hooks/assert-provider';
import { AWSDependences } from '../../types';

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
      return resolveAsset('internet-of-things/IoTThing/bank.png');
    case 'camera':
      return resolveAsset('internet-of-things/IoTThing/bicycle.png');
    case 'car':
      return resolveAsset('internet-of-things/IoTThing/camera.png');
    case 'cart':
      return resolveAsset('internet-of-things/IoTThing/car.png');
    case 'coffee pot':
      return resolveAsset('internet-of-things/IoTThing/cart.png');
    case 'door lock':
      return resolveAsset('internet-of-things/IoTThing/coffee-pot.png');
    case 'factory':
      return resolveAsset('internet-of-things/IoTThing/door-lock.png');
    case 'generic':
      return resolveAsset('internet-of-things/IoTThing/factory.png');
    case 'house':
      return resolveAsset('internet-of-things/IoTThing/generic.png');
    case 'lightbulb':
      return resolveAsset('internet-of-things/IoTThing/house.png');
    case 'medical emergency':
      return resolveAsset('internet-of-things/IoTThing/lightbulb.png');
    case 'police emergency':
      return resolveAsset('internet-of-things/IoTThing/medical-emergency.png');
    case 'thermostat':
      return resolveAsset('internet-of-things/IoTThing/police-emergency.png');
    case 'travel':
      return resolveAsset('internet-of-things/IoTThing/thermostat.png');
    case 'utility':
      return resolveAsset('internet-of-things/IoTThing/travel.png');
    case 'windfarm':
      return resolveAsset('internet-of-things/IoTThing/utility.png');
    case 'bank':
    default:
      return resolveAsset('internet-of-things/IoTThing/bank.png');
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
} & AWSDependences;

export const IoTThing: FC<IoTThingProps> = ({ type, name, children, ...dependences }) => {
  useAssertProvider();
  const icon = useIcon(type);
  const label = useLabelText(children, { defaultValue: name, htmlLike: true });
  return <IconNode name={name} icon={icon} label={label} {...dependences} />;
};

IoTThing.displayName = 'IoTThing';
