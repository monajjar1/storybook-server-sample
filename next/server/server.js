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
  const config = require('../webpack').default;
  config.mode = 'development';
  const compiler = webpack(config);


  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: config.output.publicPath,
      writeToDisk: true,
    })
  );
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
  let name = req.params.id;
  const theme = req.query.theme?.toLowerCase();
  const product = req.query.product;

  const fileLoc = path.resolve(__dirname, "../", "src", location, name);

  if(product) {
    name = `product/${product.toLowerCase()}/${name}`
  }else if(theme && theme !== "core") {
      name = `themes/${theme.toLowerCase()}/${name}`
  }else {

  }
  console.log(name)
  const scripts = ["js/vendors.build.js", `js/${name}.build.js`];
  const styles = [`css/${name}.build.css`];

  try {
    const Component = require(fileLoc).default;
    const html = `
    <script>window.__INITIAL__DATA__=${JSON.stringify(req.query)}</script>
    ${scripts.map((src) => `<script defer src="http://localhost:8080/${src}"></script>`).join("")}
    ${styles.map((src) => `<link href="http://localhost:8080/${src}" rel="stylesheet" />`).join("")}
    <div id="next-app">${ReactDOMServer.renderToString(<Component {...req.query} />)}</div>
    `;
    res.send(html);
  } catch (e) {
    console.log(e);
    res.status(404).send("Make sure you are doing something good -_____-");
  }
});


app.get("/api/themes", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  var json = JSON.stringify([
      "Core",
    "Photo",
    "Eureka"
  ]);
  res.end(json);
});


app.get("/api/products", (req, res, next) => {
  res.writeHead(200, { "Content-Type": "application/json" });

  const theme = req.query?.theme?.toLowerCase();
  let list =[];
  switch (theme) {
    case 'eureka':
      list = [
        "AAAS"
      ]
      break;
    case 'photo':
      list = [
          "SUP",
      ]
      break;
      default:
        list = [
          "Physio",
          "Perclies",
          "FSG",
        ]
  }
  var json = JSON.stringify(list);
  res.end(json);
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
