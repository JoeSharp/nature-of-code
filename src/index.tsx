import * as React from 'react';
import * as ReactDOM from 'react-dom';
import P5Sketch from './components/P5Sketch';
import './index.css';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <P5Sketch />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
