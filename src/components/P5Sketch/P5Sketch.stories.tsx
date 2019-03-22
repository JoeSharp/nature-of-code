import * as React from 'react';

import {storiesOf} from '@storybook/react';
import P5Sketch from './P5Sketch';


storiesOf('P5 Sketch', module)
.add('basic', ()=> <P5Sketch />)