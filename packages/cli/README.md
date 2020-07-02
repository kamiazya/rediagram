[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# @rediagram/cli

CLI for rediagram.

## Usage

### `rediagramc`

This command will generate images at once by pattern matching `**/*.rediagram.tsx`.

```bash
$ rediagramc
```

You can also specify the pattern yourself.

```bash
$ rediagramc "**/*.graph.tsx"
```

## Installation

The plugin can then be installed using [npm](https://www.npmjs.com/):

```bash
# yarn
yarn add -D @rediagram/cli
# or npm
npm install --save-dev @rediagram/cli
```

## Requirement

This project requires Graphviz.
If you don't have it installed, install it [here](https://graphviz.gitlab.io/download/).

## License

This software is released under the MIT License, see LICENSE.