import _ from "lodash";

const templateGenerator = (filePath,name,isRoot) => {
  let correctPath = filePath.split('/')
  correctPath.pop();
  correctPath = correctPath.join('/');

  const className = _.capitalize(_.camelCase(name));
  const template = `
  import React from 'react';
  import ReactDOM from 'react-dom';
  import ${className} from '${isRoot ? '': '../../'}../../src/${filePath}';
  const container = document.getElementById('next-app');
  const root = ReactDOM.hydrateRoot(container, <${className} {...window.__INITIAL__DATA__} />);
  if (module.hot) {
    module.hot.accept();
  }
  `;

  return template;
};

export default templateGenerator;
