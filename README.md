[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](http://makeapullrequest.com)

# rediagram

Prototyping system architectures by using React/MDX.

## Key Feature

### Draw Your System with JSX/TSX

Code your system architecture in the style of React, JSX/TSX.

[source](./examples/gallery/MyInfra.tsx)

```tsx
import React from 'react';
import { PNG, Diagram } from 'rediagram';
import { AWS, EC2, Lambda, Region, SecurityGroup, AutoScalingGroup, AWSGeneralIcon } from '@rediagram/aws';

PNG(
  <Diagram title="My Infra">
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
    <AWSGeneralIcon name="Browser" type="Client" upstream={['REST API']} />
  </Diagram>,
);
```

![MyInfra](./examples/gallery/MyInfra.png)

You can choose PNG, SVG, or PDF as the output format.

See [more](./examples/gallery/README.md).

### Embed your diagram in MDX ![WIP](https://img.shields.io/badge/-WIP-yellow)

```md
# My Infra

This is My awesome infra.

<Diagram title="My Infra">
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
  <AWSGeneralIcon name="Browser" type="Client" upstream={['REST API']} />
</Diagram>
```

```html
<h1>My Infra</h1>
<p>This is My awesome infra.</p>
<img src="data:image/svg+xml;base64,..." />
```

## Packages

- Examples
  - [Gallery](./examples/gallery/README.md)
  - [MDX](./examples/mdx/README.md)
- Core
  - [rediagram](./packages/rediagram/README.md) - Common components for drawing diagrams and functions for image output.
  - [@rediagram/cli](./packages/cli/README.md) - CLI for rediagram.
- Component Libraries
  - [@rediagram/aws](./component-libraries/aws/README.md) - Components for drawing AWS diagrams.
  - @rediagram/gcp ![TODO](https://img.shields.io/badge/-TODO-blue)
  - etc,
    - We have no plans yet, but welcome contributions.

## Requirement

This project requires Graphviz.
If you don't have it installed, install it [here](https://graphviz.gitlab.io/download/).

## License

This software is released under the MIT License, see [LICENSE](./LICENSE).
