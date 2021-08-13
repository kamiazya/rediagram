---
id: introduction
title: Introduction
sidebar_label: Introduction
slug: /
---

## What's rediagram?

rediagram can generate an image of the infrastructure diagram by describing the infrastructure configuration using JSX notation[^1].

Let's try to create an infrastructure configuration diagram with the following requirements:

- Infrastructure is on GCP
- API runs on AppEngine
- Connect via CloudEndpoints from devices such as iOS/Android/Web

In rediagram, such infrastructure can be expressed by the following code.

```jsx title="AppBackend.rediagram.tsx"
import React from 'react';
import { PNG, Diagram, GeneralIcon } from 'rediagram';
import { GCP, AppEngine, CloudEndpoints, InvizGCP } from '@rediagram/gcp';

PNG(
  <Diagram title="App Engine and Cloud Endpoints">
    <InvizGCP>
      <GeneralIcon
        name="iOS/Android/Web"
        type="Mobile client"
        upstream={['Mobile Backend API']} />
      <GCP>
        <CloudEndpoints name="Mobile Backend API" upstream={['API']} />
        <AppEngine name="API" />
      </GCP>
    </InvizGCP>
  </Diagram>
);
```

When this source file is executed by [ts-node](https://github.com/TypeStrong/ts-node) etc.[^2], the following image will be output to the directory.

<img alt="gcp diagram" src={require('../../assets/AppEngineAndCloudEndpoints.rediagram.png').default} />

:::info

In this example, I drew the infrastructure diagram of GCP, but [@rediagram/aws](https://www.npmjs.com/package/@rediagram/aws) provides many components for drawing the infrastructure diagram of AWS.

Other cloud providers will be supported in sequence.
:::

## Concept

rediagram is a framework for using [React](https://reactjs.org/) to generate infrastructure diagrams.

Taking advantage of the following features of React, it provides a function to declaratively create an infrastructure configuration diagram.

- **Declarative**
  - It provides the ability to declaratively create a UI by using JSX, an extended syntax of JavaScript.
- **Component-Based**
  - With React, you can first create an encapsulated component that manages your own state and then combine them to build a complex UI.
  - rediagram provides the services provided by each cloud provider as components. By combining these, it will create an infrastructure configuration diagram.
- **Learn Once, Write Anywhere**
  - React is generally established as a technology for building applications on browsers using ReactDOM etc., but there are no restrictions on the technology that can be used in combination.
  - rediagram is used in combination with [Graphviz](https://graphviz.org/) to create an infrastructure diagram.

## Features

1. **Beautiful Infrastructure diagram**
    - rediagram can generate a beautiful infrastructure diagram without any config.
    - It is designed to output diagrams that follow the design guidelines provided by each cloud provider by using packages such as [@rediagram/gcp](https://www.npmjs.com/package/@rediagram/gcp) and [@rediagram/aws](https://www.npmjs.com/package/@rediagram/aws).
1. **Zero Config**
    - rediagram aims to work without the need for detailed settings. In addition, you can set the behavior common to all projects by adding a config file.
1. **Support TypeScript** [^3]
    - rediagram provides a `d.ts` file. You can get support such as type completion through editors such as VSCode and IDEs.

[^1]: JavaScript syntax extension. You can express structured values like XML in JavaScript.
[^2]: JSX files can be run through a transpiler that can interpret JSX.
      Since the TypeScript compiler can interpret JSX, ts-node, which can be executed directly through the TypeScript compiler, is convenient.
[^3]: A free and open source programming language developed and maintained by Microsoft.
      It's a strict superset of JavaScript with optional static typing and class-based object orientation.
      <https://www.typescriptlang.org/>
