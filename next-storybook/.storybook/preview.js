export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Theme '
  },
  product: {
    name: 'Product',
    description: 'Product '
  }
};

const fetchStoryHtml = async (url, path, params, context) => {
  const serverURL = new URL(`${url}/${path}`);

  for (let key in params) {
    serverURL.searchParams.append(key, params[key]);
  }
  for(let key in context.globals) {
    if(context.globals[key]) {
      serverURL.searchParams.append(key, context.globals[key]);
    }
  }
  const response = await fetch(serverURL);
  const html = await response.text();
  // Custom fetch implementation
  // ....
  return html;
};

export const parameters = {
  server: {
    url: 'http://localhost:8080/preview',
    fetchStoryHtml
  },
};
