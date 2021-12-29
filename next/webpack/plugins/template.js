import _ from "lodash";

const templateGenerator = (name) => {
  const className = _.capitalize(name);
  const template = `
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ${className} from '../../src/components/${name}';
  
  ReactDOM.hydrate(
      <${className} {...window.__INITIAL__DATA__} />,
    document.getElementById('root')
  );
  
  
  if (module.hot) {
    module.hot.accept();
  }
  `;

  return template;
};

export default templateGenerator;
