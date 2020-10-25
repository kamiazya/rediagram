---
id: architecture
title: Architecture
sidebar_label: Architecture
slug: /getting-started/architecture
---

## Dependent software

rediagram depends on the following software:

- [Graphviz](https://graphviz.org/)
  - Software for drawing graph structures. You can specify what kind of diagram to draw in Graphviz with the data description language called DOT language [^1].
- [Node.js](https://nodejs.org/)
  - A JavaScript execution environment built on the V8 JavaScript engine.

## How it works?

rediagram uses React to output the DOT language from JSX and Graphviz to generate an image of the infrastructure diagram.

```plain
      React        Graphviz
JSX --------> DOT ---------> 画像
```

[^1]: A type of data description language for expressing graphs as data structures using plain text.
      Graphs can be drawn in a simplified format that is easy to process on a computer and easy to understand visually.
