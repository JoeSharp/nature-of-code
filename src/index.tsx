import * as React from 'react';
import * as ReactDOM from 'react-dom';
import P5Sketch from './components/P5Sketch';
import registerServiceWorker from './registerServiceWorker';
import gravityOrbits from './sketches/gravityOrbits';

ReactDOM.render(
  <P5Sketch sketch={gravityOrbits}/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
