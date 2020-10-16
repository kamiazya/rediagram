[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# rediagram

Markup and draw your system diagrams with React.

## Key Feature

### Draw Your System with JSX/TSX

Code your system architecture in the style of React, JSX/TSX.

[MyInfra.rediagram.tsx](./examples/gallery/MyInfra.rediagram.tsx)

```tsx
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

Running this file will generate a diagram of `MyInfra.rediagram.png`.

```bash
$ ts-node MyInfra.rediagram.tsx
```

![MyInfra](./examples/gallery/MyInfra.rediagram.png)

You can choose PNG, SVG, or PDF as the output format.

See [more examples](./examples/gallery/README.md).

> Note:
> Do you want to execute them all at once?
>
> We provide the rediagramc command that generates images at once by matching the patterns of `**/*.rediagram.tsx`.
>
> See [@rediagram/cli](./packages/cli/README.md) for more details.

## Packages

- Core
  - [rediagram](./packages/rediagram/README.md) - Common components for drawing diagrams and functions for image output.
  - [@rediagram/cli](./packages/cli/README.md) - CLI for rediagram.
  - [@rediagram/cdk](./packages/cdk/README.md) - Component Development Kit for rediagram library.
  - [@rediagram/tsconfig](./packages/tsconfig/README.md) - A base TSConfig for working with rediagram.
- Component Libraries
  - [@rediagram/aws](./component-libraries/aws/README.md) - Components for drawing AWS diagrams.
  - [@rediagram/gcp](./component-libraries/gcp/README.md) - Components for drawing GCP diagrams.
  - etc,
    - We have no plans yet, but welcome contributions.
- Miscellaneous
  - [@rediagram/docker-runtime](./docker/README.md) - rediagram runtime for Docker. ![WIP](https://img.shields.io/badge/-WIP-yellow)
- Examples
  - [Gallery](./examples/gallery/README.md)

## Requirement

This project requires Graphviz.
If you don't have it installed, install it [here](https://graphviz.gitlab.io/download/).

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
