import _ from "lodash";

const templateGenerator = (name) => {
  const className = _.capitalize((_.camelCase(name)));
  const template = `
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ${className} from '../../src/components/${name}';
  
  ReactDOM.hydrate(
      <${className} {...window.__INITIAL__DATA__} ></${className}>,
    document.getElementById('next-app')
  );
  
  
  if (module.hot) {
    module.hot.accept();
  }
  `;

  return template;
};

export default templateGenerator;
