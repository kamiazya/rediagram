---
id: introduction
title: rediagram とは
sidebar_label: rediagram とは
slug: /
---

## 何ができるのか

rediagram を使用すると、 JSX 表記[^1]を使用してインフラの構成を記述することにより、インフラ構成図のイメージを生成できます。

試しに下記のような要件のインフラ構成図を作成してみましょう。

- インフラは GCP 上にある
- API は App Engine で動いている
- iOS/Android/Web などの端末からは CloudEndpoints 経由で接続する

このようなインフラを下記のようなコードで表現できます。

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

このファイルを[ts-node](https://github.com/TypeStrong/ts-node)など[^2]で実行すると、下記のような画像がディレクトリに出力されます。

<img alt="gcp diagram" src={require('../../../../../assets/AppEngineAndCloudEndpoints.rediagram.png').default} />

:::info

今回の例では GCP のインフラ構成図を描きましたが、 [@rediagram/aws](https://www.npmjs.com/package/@rediagram/aws) には AWS のインフラ構成図を描くための多くのコンポーネントが提供されています。

他のクラウドプロバイダも順次サポート予定です。

:::

## コンセプト

rediagram は [React](https://ja.reactjs.org/) を使用して、インフラ構成図を生成するためのフレームワークです。
React の下記の特徴を活かし、宣言的にインフラ構成図を作成する機能を提供しています。

- **宣言的な View**
  - JavaScript の拡張構文である JSX を使うことで、宣言的に UI を作成する機能を提供しています。
- **コンポーネントベース**
  - React では、自分自身の状態を管理するカプセル化されたコンポーネントをまず作成し、これらを組み合わせることで複雑な UI を構築できます。
  - rediagram は、各クラウドプロバイダの提供するサービスをコンポーネント化して提供しています。 これらのコンポーネントを組み合わせて、インフラ構成図を作成できます。
- **一度学習すればどこでも使える** [^3]
  - React は、一般的には ReactDOM などを使ってブラウザ上でアプリケーションを構築する技術として定着していますが、組み合わせて使用する技術に制限はありません。
  - rediagram は、 [Graphviz](https://graphviz.org/) と組み合わせることで、インフラ構成図を作成しています。

## 特徴

1. キレイなインフラ構成図
    - rediagram を使うと特別な設定なしでキレイなインフラ構成図を生成できます。
    - [@rediagram/gcp](https://www.npmjs.com/package/@rediagram/gcp) や [@rediagram/aws](https://www.npmjs.com/package/@rediagram/aws) などのパッケージを使うことで各クラウドプロバイダが提供するデザインガイドラインに沿った図が出力されるように設計されています。
1. Zero Config
    - rediagram は、細かい設定不要で動作することを目指しています。 また、設定ファイルを追加することでプロジェクト共通の挙動を設定できます。
1. TypeScript [^4] サポート
    - rediagram は `d.ts` ファイルを提供しています。 VSCode などのエディタや IDE を通して、型補完などのサポートを得ることができます。

[^1]: JavaScriptの構文の拡張。JavaScript内にXMLのような構造化された値の表現ができる。
[^2]: JSXファイルはJSXを解釈できるトランスパイラを通して実行できる。TypeScriptコンパイラはJSXを解釈できるので、TypeScriptコンパイラを通して直接実行できるts-nodeが便利。
[^3]: Learn Once, Write Anywhere. の哲学。
[^4]: Microsoft によって開発され、メンテナンスされているフリーでオープンソースのプログラミング言語。 JavaScript に対して、省略も可能な静的型付けとクラスベースオブジェクト指向を加えた厳密なスーパーセットとなっている。 <https://www.typescriptlang.org/>
