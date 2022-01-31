import React from 'react';
import ReactDOM from 'react-dom';
import { AllRoutes } from './routes';
import './styles/global.scss';

ReactDOM.render(
  <React.StrictMode>
    <AllRoutes />
  </React.StrictMode>,
  document.getElementById('root')
);
