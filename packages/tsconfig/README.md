[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

### A base TSConfig for working with rediagram

Add the package to your `"devDependencies"`:

```sh
$ npm install --save-dev @rediagram/tsconfig
# or yarn
$ yarn add --dev @rediagram/tsconfig
```

Add to your `tsconfig.json`:

```json
"extends": "@rediagram/tsconfig/tsconfig.json"
```

---

The `tsconfig.json`:

```jsonc
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "display": "rediagram",
  "compilerOptions": {
    "jsx": "react",
    "lib": [],
    "resolveJsonModule": true,
    "strict": true
  }
}
```

## License

This software is released under the MIT License, see LICENSE.
