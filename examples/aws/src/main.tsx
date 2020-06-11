import React from 'react';
import path from 'path';
import { renderToFile } from '@diagrams-prototype/common';
import { MyInfra } from './MyInfra';
import { GitToS3WebHooks } from './GitToS3WebHooks';
import { ChefAutomateArchitectureOnAWS } from './ChefAutomateArchitectureOnAWS';

renderToFile(<MyInfra />, {
  output: path.resolve(__dirname, '../MyInfra.png'),
});

renderToFile(<GitToS3WebHooks />, {
  output: path.resolve(__dirname, '../GitToS3WebHooks.png'),
});

renderToFile(<ChefAutomateArchitectureOnAWS />, {
  output: path.resolve(__dirname, '../ChefAutomateArchitectureOnAWS.png'),
});
