import fs from "fs";
import path from "path";
import templateGenerator from "./template";

export default class ReactAppGeneratorPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.beforeCompile.tap(this.toString(), (stats) => {
      this.generate();
    });
  }

  toString() {
    return "ReactAppGeneratorPlugin";
  }

  generate() {
    const generatedDir = path.resolve(__dirname,'..', "gen");

    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true });
    }

    fs.mkdirSync(generatedDir);

    fs.readdirSync(path.resolve(__dirname, "..",'..', "src", "components")).forEach(
      (item) => {
        const template = templateGenerator(item);

        fs.writeFileSync(
          path.resolve(generatedDir, `${item}.js`),
          template,
          function (err) {
            if (err) throw err;
            console.log("File is created successfully.");
          }
        );
      }
    );
  }
}
