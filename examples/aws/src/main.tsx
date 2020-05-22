import React from 'react';
import { resolve } from 'path';
import { renderToFile } from '@diagrams-prototype/common';
import { MyInfra } from './MyInfra';

renderToFile(<MyInfra />, resolve(__dirname, '../result.png'));
