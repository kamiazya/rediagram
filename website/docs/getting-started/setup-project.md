---
id: setup-project
title: Setup Project
sidebar_label: Setup Project
slug: /getting-started/setup-project
---

You can initialize the project at once by using the `create-rediagram-project` command.

[![NPM](https://nodei.co/npm/create-rediagram-project.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/create-rediagram-project/)

You can use the yarn command to install packages and initialize projects with a single command.

## Procedure {#procedure}

1. Initialize the project by specifying the project name.

    ```bash
    # yarn create rediagram-project <project-name>
    $ yarn create rediagram-project my-rediagram
      🌈 Creating new rediagram project in my-rediagram.
      ...
    ```

1. Move to your project's directory and make sure your project is initialized.

    ```bash
    # Move to the specified directory
    $ cd my-rediagram
    # Display file tree
    $ tree . -I node_modules -a
      .
      ├── .editorconfig
      ├── .rediagramrc.yaml
      ├── README.md
      ├── img
      │   └── .gitkeep
      ├── package.json
      ├── src
      │   └── MyInfra.rediagram.tsx
      ├── tsconfig.json
      └── yarn.lock

      2 directories, 8 files
    ```

    ```tsx title="src/MyInfra.rediagram.tsx"
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

1. The `yarn start` command outputs `MyInfra.rediagram.png` in the `img` directory.

    ```bash {11}
    $ yarn start
      $ rediagramc

    $ tree . -I node_modules -a
      .
      ├── .editorconfig
      ├── .rediagramrc.yaml
      ├── README.md
      ├── img
      │   ├── .gitkeep
      │   └── MyInfra.rediagram.png
      ├── package.json
      ├── src
      │   └── MyInfra.rediagram.tsx
      ├── tsconfig.json
      └── yarn.lock

      2 directories, 9 files
    ```

    <img alt="MyInfra" src={require('../../assets/MyInfra.rediagram.png').default} />

    :::note
    The `rediagramc` command is provided in the [@rediagram/cli](https://www.npmjs.com/package/@rediagram/cli) package.

    Executes the file with the pattern specified by `includes` in `.rediagramrc.yaml`.

    :::
