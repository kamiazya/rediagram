# Contributing Guide

rediagram uses Yarn for running development scripts.
If you haven't already done so, please [install yarn](https://yarnpkg.com/en/docs/install).

## Environment

- Node.js >= 10
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Graphviz](https://graphviz.gitlab.io/download/)

## Bootstrap

First, you should install all dependencies by following:

    # In project root
    yarn install

rediagram repository is monorepo top on [lerna](https://github.com/lerna/lerna "lerna").

## How to contribute?

You can find suitable issues to contribute on [Issues label:good first issue](https://github.com/kamiazya/rediagram/labels/good%20first%20issue).

Of course, welcome to fix the other issue or file issue.

Basic Pull Request steps:

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## How to run tests?

Run all lints that includes examples in Node.js:

    yarn lint

## How to write git commit message?

rediagram has adopted [Conventional Commits](https://conventionalcommits.org/ "Conventional Commits")

[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg)](https://conventionalcommits.org)

```
                       component        commit title
        commit type       /                /
                \        |                |
                 feat(rule-context): add template url parameter to events

        body ->  The 'src` (i.e. the url of the template to load) is now provided to the
                 `$includeContentRequested`, `$includeContentLoaded` and `$includeContentError`
                 events.

 referenced  ->  Closes #8453
 issues          Closes #8454
```

- `commit type`:
  - `BREAKING CHANGE`: breaking change(major update)
  - `feat`: add new feature(minor update)
  - `fix`: fix a bug(patch update)
  - `style`: format style(patch update)
  - `refactor`: refactoring(patch update)
  - `perf`: it is related performance(patch update)
  - `test`: update tests(patch update)
  - `docs`: update documents(patch update)
  - `chore`: the other(patch update)
- `component`: package name or file name
  - e.g.) `rediagram`, `@rediagram/aws`, `@rediagram/cli`, `@rediagram/cdk`

If you commit cross `component` changes in a pull request, separate commits by `component`.

### Example: commit message

Example: Add new feature – This is minor update

```
feat(aws): add new feature

Describe in details.

fix #42
```

Example: Fix a bug

```
fix(aws): `tryUpdateState` should be called before finished

Describe in details.

fix #42
```

Example: BREAKING CHANGE

```
feat(aws): Change default StoreGroup

BREAKING CHANGE: make `StoreGroup` as default store

fix #42
```

## Release workflow

**For maintainer**:  This document describe release flow for maintainer.

1. Bump version and tag

Run one of following command.

Recommend: `yarn run versionup`

```shell
# automatic versioning by commit message
$ yarn run versionup
# major update for all
$ yarn run versionup:major
# minor update for all
$ yarn run versionup:minor
# path update for all
$ yarn run versionup:patch
```

2. Publish to npm

Finally, publish new version to npm by running next command:

```
$ yarn run release
```
