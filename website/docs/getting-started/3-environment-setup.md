---
id: getting-started-environment-setup
title: Environment Setup
sidebar_label: Environment Setup
slug: /getting-started/environment-setup
---

## 1. Initialize your npm project

For example, create a directory for my-rediagram and initialize package.json.

```bash
$ mkdir my-rediagram && cd $_
$ npm init -y

Wrote to /path/to/my-rediagram/package.json:

{
  "name": "my-rediagram",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "license": "ISC"
}
```

## 2. Install Dependencies

Use the npm command to install the required packages.

Install rediagram and React, ts-graphviz related packages, and babel packages.

```bash {1,12}
$ npm install -S rediagram react @rediagram/aws @ts-graphviz/react react-dom ts-graphviz

+ @rediagram/aws@0.2.0
+ @ts-graphviz/react@0.7.0
+ ts-graphviz@0.13.2
+ react@16.13.1
+ react-dom@16.13.1
+ rediagram@0.1.0
updated 6 packages and audited 201 packages in 10.059s
found 0 vulnerabilities

$ npm install -D @babel/core @babel/register @babel/preset-env @babel/preset-react

+ @babel/register@7.11.5
+ @babel/preset-env@7.11.5
+ @babel/core@7.11.6
+ @babel/preset-react@7.10.4
updated 4 packages and audited 201 packages in 5.538s
found 0 vulnerabilities

```

After executing this command, the following dependencies will be created.

```json {11-24} title="package.json"
{
  "name": "my-rediagram",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "license": "ISC",
  "dependencies": {
    "@rediagram/aws": "^0.2.0",
    "@ts-graphviz/react": "^0.7.0",
    "react": "^16.13.1",
    "react-dom": "^16.13.1",
    "rediagram": "^0.1.0",
    "ts-graphviz": "^0.13.2"
  },
  "devDependencies": {
    "@babel/core": "^7.11.6",
    "@babel/preset-env": "^7.11.5",
    "@babel/preset-react": "^7.10.4",
    "@babel/register": "^7.11.5"
  }
}
```

## 3. Put `.babelrc`

In the project root, put the following json as `.babelrc`.

```json title=".babelrc"
{
  "presets": [
    "@babel/preset-react",
    [
      "@babel/preset-env",
      {
        "targets": {
          "node": true
        }
      }
    ]
  ]
}
```

## 4. Create rediagram file

Finally, create a file called my-rediagram.jsx and paste the code below as a trial.

```jsx title="my-rediagram.jsx"
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

## 5. Run the script

Run this file via babel.

```bash
node -r @babel/register my-rediagram.jsx
```

Then, a png image of the diagram with the name my-rediagram.png will be output to the project root.

<img src={require('./assets/MyInfra.rediagram.png').default} />

:::tip

The `@rediagram/aws` package contains other components that represent various AWS services.

Let's import various packages as a trial and make the composition diagram you want to draw!

:::


:::note
In addition, `@rediagram/gcp` also contains components that represent GCP services.

```bash
npm install -S @rediagram/gcp
```

:::
