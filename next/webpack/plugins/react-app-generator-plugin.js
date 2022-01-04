import fs from "fs";
import path from "path";
import templateGenerator from "./template";

export default class ReactAppGeneratorPlugin {
  constructor(options) {
    this.options = options;
  }
  apply(compiler) {
    compiler.hooks.compile.tap(this.toString(), (stats) => {
      const modules = this.modules;
      if (this.shouldUpdate(modules)) {
        this.generate(modules);
      }
    });
  }

  toString() {
    return "ReactAppGeneratorPlugin";
  }

  get genPath() {
    return path.resolve(__dirname, '..', "gen");
  }

  shouldUpdate(modules) {
    const generatedDir = this.genPath;

    if (!fs.existsSync(generatedDir)) {
      return true;
    }

    const currentModules = modules;
    const generateModules = fs.readdirSync(generatedDir);


    if (currentModules.length != generateModules.length) {
      return true;
    }

    const filterd = currentModules.filter(module => {
      return generateModules.findIndex(generatedModule => generatedModule.toLowerCase().indexOf(module.toLowerCase()) > -1) < 0;
    })
    return filterd.length;
  }


  get modules() {
    return fs.readdirSync(path.resolve(__dirname, "..", '..', "src", "components"))
  }

  generate(modules) {
    const generatedDir = this.genPath;

    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true });
    }

    fs.mkdirSync(generatedDir);

    modules.forEach(
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
