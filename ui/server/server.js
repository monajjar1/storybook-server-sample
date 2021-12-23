import express from "express";
import cors from "cors";

import fs from "fs";
import path from "path";

import React from 'react';
import ReactDOMServer from "react-dom/server";

import App from "../src/App";

const PORT = 8080;

const app = express();

app.use(cors());

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
  const component = req.params.id;

  const fileLoc = path.resolve(__dirname, "../", "src", location, component);
  try {
    const Component = require(fileLoc).default;
    const html = fs.readFileSync(path.resolve("./build/index.html"),'utf-8');
    // res.send(html.replace('<div id="a7a"></div>', `<script>window.intialState='${ReactDOMServer.renderToString(<Component {...req.query}/>)}'</script><div id="a7a">${<App/>}</div>`));
    res.send(html.replace('<div id="a7a"></div>', `<script>window.intialState={Component:${Component}}</script><div id="a7a">${<App/>}</div>`));
  } catch (e) {
    console.log(e);
    res.status(404).send("Make sure you are doing something good -_____-");
  }
});

app.use(express.static(path.resolve(__dirname, "..", "build")));

app.listen(PORT, () => {
  console.log(`App launched on ${PORT}`);
});
