---
id: getting-started-introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

This guide will help you get started with rediagram. This section describes how to install and use the dependent modules. It does not cover advanced usage or advanced options. See other reference guides for more information on features and configuration options.

## Prerequisites

To work with rediagram, you will need to have an understanding of JavaScript fundamentals. If you’re new to JavaScript or need a refresher, you can [dive in](https://developer.mozilla.org/en-US/docs/Web/JavaScript) or [brush up](https://developer.mozilla.org/en-US/docs/Web/JavaScript/A_re-introduction_to_JavaScript) at Mozilla Developer Network.

## Examples

With redigram, you can get the following image of the infrastructure configuration diagram by describing the infrastructure configuration using React JSX notation.

Example of describing AWS infrastructure configuration diagram using `@rediagram/aws`:

```jsx
import React from 'react';
import { PNG, Diagram, GeneralIcon } from 'rediagram';
import { AWS, InvizAWS, EC2, Lambda, Region, SecurityGroup, AutoScalingGroup } from '@rediagram/aws';

PNG(
  <Diagram title="My Infra">
    <InvizAWS>
      <AWS>
        <Region name="Asia Pacific (Tokyo)">
          <AutoScalingGroup>
            <EC2 name="REST API" type="Instance" upstream={['worker4']} />
          </AutoScalingGroup>
          <SecurityGroup>
            <Lambda name="worker4" type="Lambda Function" upstream={['worker5', 'worker6']} />
            <Lambda name="worker5" type="Lambda Function" />
            <Lambda name="worker6" type="Lambda Function" />
          </SecurityGroup>
        </Region>
      </AWS>
      <GeneralIcon name="Browser" type="Client" upstream={['REST API']} />
    </InvizAWS>
  </Diagram>,
);
```

<img src={require('./assets/MyInfra.rediagram.png').default} />

An example of describing a GCP infrastructure diagram using @rediagram/gcp:

```jsx
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
```

<img src={require('./assets/AppEngineAndCloudEndpoints.rediagram.png').default} />
