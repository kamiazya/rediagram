import React from 'react';
import { PNG, Diagram, GeneralIcon } from 'rediagram';
import { InvizFirebase, CloudFirestore, CloudMessaging, CloudFunctions } from '@rediagram/firebase';

PNG(
  <Diagram title="Realtime Notification architecture">
    <InvizFirebase serviceName>
      <GeneralIcon name="App" type="Mobile client" upstream={['DB']} />
      <CloudFirestore name="Event" type="icon" upstream={['Handle Event']} downstream={['DB']} />
      <CloudFirestore name="DB" />
      <CloudFunctions name="Handle Event" upstream={['FCM']} />
      <CloudMessaging name="FCM" upstream={['App']} />
    </InvizFirebase>
  </Diagram>,
);
