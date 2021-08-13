---
id: setup-project
title: プロジェクトを初期化する
sidebar_label: プロジェクトを初期化する
slug: /getting-started/setup-project
---

`create-rediagram-project` コマンドを使用することで、プロジェクトを一気に初期化できます。

[![NPM](https://nodei.co/npm/create-rediagram-project.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/create-rediagram-project/)

yarn コマンドを使うことで、1 コマンドでパッケージのインストールとプロジェクトの初期化を実施できます。

## 手順

1. プロジェクト名を指定して、プロジェクトを初期化します。

    ```bash
    # yarn create rediagram-project <project-name>
    $ yarn create rediagram-project my-rediagram
      🌈 Creating new rediagram project in my-rediagram.
      ...
    ```

1. プロジェクトのディレクトリに移動すると、下記のようなプロジェクトが初期化されています。

    ```bash
    # 指定したディレクトリに移動
    $ cd my-rediagram
    # ファイルツリーを表示
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
    $ cat src/MyInfra.rediagram.tsx
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

1. `yarn start` コマンドを実行すると `img` ディレクトリ内に `MyInfra.rediagram.png` が出力されます。

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

    <img src={require('../../../../../assets/MyInfra.rediagram.png').default} />

    :::info
    `rediagramc` コマンドは [@rediagram/cli](https://www.npmjs.com/package/@rediagram/cli) パッケージで提供されています。
    `.rediagramrc.yaml` の `includes` で指定したパターンのファイルを実行します。

    :::
