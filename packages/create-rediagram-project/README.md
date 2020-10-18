[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# create-rediagram-project

Starter kit for rediagram.

## How to use

Execute the following command to initialize the rediagram project in the specified directory.

```bash
# yarn create rediagram-project <your-project-name>
$ yarn create rediagram-project my-rediagram
🌈 Creating new rediagram project in my-rediagram.

⭐️ Installing packages. This take a couple of minutes.

yarn install v1.22.4
info No lockfile found.
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 9.38s.

✨ The installation is complete.

👉 Get started with following commands:

    # Move to the project directory with the following command.
    $ cd my-rediagram

🚀 In the project directory, you can run:

    # Runs src/*.rediagram.tsx scripts and output the image with rediagram.
    $ yarn start

```

## Help

```bash
$ create-rediagram-project -h
Usage: create-rediagram-project [options] <name>

Options:
  -V, --version               output the version number
  -p, --package-manager <pm>  select a package manager, yarn or npm. (default: "yarn")
  -h, --help                  display help for command
```

## License

This software is released under the MIT License, see LICENSE.
