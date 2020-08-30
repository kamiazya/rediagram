import React from 'react';
import { PNG, Diagram, GeneralIcon } from 'rediagram';
import { GCP, AppEngine, CloudEndpoints, InvizGCP } from '@rediagram/gcp';

PNG(
  <Diagram title="App Engine and Cloud Endpoints">
    <InvizGCP>
      <GeneralIcon name="iOS/Android/Web" type="Mobile client" upstream={['Mobile Backend API']} />
      <GCP>
        <CloudEndpoints name="Mobile Backend API" upstream={['API']} />
        <AppEngine name="API" />
      </GCP>
    </InvizGCP>
  </Diagram>,
);
