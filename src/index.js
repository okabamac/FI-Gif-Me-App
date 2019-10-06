import React from 'react';
import { render } from 'react-dom';
import App from './App';
import './index.css';
const title = 'Text To Gif App';

render(
  <App title={title} />,
  document.getElementById('root')
);

module.hot.accept();
