
  import React from 'react';
  import ReactDOM from 'react-dom';
  import Button from '../../src/components/button';
  
  ReactDOM.hydrate(
      <Button {...window.__INITIAL__DATA__} />,
    document.getElementById('root')
  );
  
  
  if (module.hot) {
    module.hot.accept();
  }
  