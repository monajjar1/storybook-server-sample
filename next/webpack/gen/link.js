
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Link from '../../src/components/button/link/index.js';
  
  ReactDOM.hydrate(
      <Link {...window.__INITIAL__DATA__} ></Link>,
    document.getElementById('next-app')
  );
  
  
  if (module.hot) {
    module.hot.accept();
  }
  