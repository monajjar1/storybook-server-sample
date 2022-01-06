
  import React from 'react';
  import ReactDOM from 'react-dom';
  import App from '../../../../src/themes/eureka/components/app/index.js';
  
  ReactDOM.hydrate(
      <App {...window.__INITIAL__DATA__} ></App>,
    document.getElementById('next-app')
  );
  
  
  if (module.hot) {
    module.hot.accept();
  }
  