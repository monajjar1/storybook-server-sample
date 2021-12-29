import express from "express";
import cors from "cors";

import path from "path";

import React from "react";
import ReactDOMServer from "react-dom/server";

const PORT = 8080;

const app = express();

global.app = app;
global.PORT = PORT;

app.use(cors());

const isDevMode = process.env.NODE_ENV === "development";
if (isDevMode) {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require("webpack-hot-middleware");
  const config = require('../webpack').default;
  config.mode = 'development';
  const compiler = webpack(config);

  
  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
    })
  );
  app.use(webpackHotMiddleware(compiler));
}

// app.use("^/$", (req, res, next) => {
//   fs.readFile(path.resolve("./build/index.html"), "utf-8", (err, data) => {
//     if (err) {
//       console.log(err);
//       return res.status(500).send("Some error happened");
//     }
//     return res.send(
//       data.replace(
//         '<div id="a7a"></div>',
//         `<div id="a7a">${ReactDOMServer.renderToString(<App />)}</div>`
//       )
//     );
//   });
// });

app.get("/preview/:type/:id", (req, res, next) => {
  const location = req.params.type;
  const name = req.params.id;

  const fileLoc = path.resolve(__dirname, "../", "src", location, name);
  const scripts = ["/js/vendors.build.js", `/js/${name}.build.js`];
  const styles = [`/css/${name}.build.css`];


  if(isDevMode){
    scripts.push("/js/react-hot-loader.build.js")
    scripts.push("/js/hot-middleware.build.js")
  }
  try {
    const Component = require(fileLoc).default;
    const html = `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    ${scripts.map((src) => `<script defer src="${src}"></script>`).join("")}
    ${styles.map((src) => `<link href="${src}" rel="stylesheet" />`).join("")}
    </head>

    <script>window.__INITIAL__DATA__=${JSON.stringify(req.query)}</script>
</head>
<body>
    <div id="root">${ReactDOMServer.renderToString(
      <Component {...req.query} />
    )}</div>
</body>
</html>
    `;
    res.send(html);
    // res.send(html.replace('<div id="a7a"></div>', `<script>window.intialState={Component:${Component}}</script><div id="a7a">${<App/>}</div>`));
  } catch (e) {
    console.log(e);
    res.status(404).send("Make sure you are doing something good -_____-");
  }
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
