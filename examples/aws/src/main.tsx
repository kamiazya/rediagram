import React from 'react';
import { resolve } from 'path';
// import { render } from '';
import { renderToFile } from '@diagrams-prototype/common';
import { MyInfra } from './MyInfra';
import { GitToS3WebHooks } from './GitToS3WebHooks';

renderToFile(<MyInfra />, resolve(__dirname, '../MyInfra.png'));
renderToFile(<GitToS3WebHooks />, resolve(__dirname, '../GitToS3WebHooks.png'));
