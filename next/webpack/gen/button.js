
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Button from '../../src/components/button/index.js';
  
  ReactDOM.hydrate(
      <Button {...window.__INITIAL__DATA__} ></Button>,
    document.getElementById('next-app')
  );
  
  
  if (module.hot) {
    module.hot.accept();
  }
  