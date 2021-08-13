---
id: architecture
title: アーキテクチャ
sidebar_label: アーキテクチャ
slug: /getting-started/architecture
---

## 依存ソフトウェア

rediagram は、下記のソフトウェアに依存しています。

- [Graphviz](https://graphviz.org/)
  - グラフ構造を描画するためのソフトウェア。 DOT 言語[^1] というデータ記述言語で、Graphviz にどのような図を書くのかを指定できる。
- [Node.js](https://nodejs.org/)
  - V8 JavaScript エンジン上に構築された JavaScript 実行環境。

## しくみ

rediagram では、 React を使い JSX から DOT 言語を出力し、 Graphviz でインフラ構成図の画像を生成しています。

```plain
      React           Graphviz
JSX --------> DOT言語 ---------> 画像
```

[^1]: プレーンテキストを用いてデータ構造としてのグラフを表現するための、データ記述言語の一種。コンピュータで処理しやすく、かつ目で見ても分かり易い、単純化された形式でグラフを記述することができる。
