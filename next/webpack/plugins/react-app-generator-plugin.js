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
    const generateModules = this.walk(generatedDir);


    if (currentModules.length != generateModules.length) {
      return true;
    }

    return false;
    const filterd = currentModules.filter(module => {
      return generateModules.findIndex(generatedModule => generatedModule.toLowerCase().indexOf(module.toLowerCase()) > -1) < 0;
    })
    return filterd.length;
  }


  walk(dir)  {
    var results = [];
    fs.readdirSync(dir).forEach(file=>{
      file = dir + '/' + file;
      var fileStat = fs.statSync(file);
      if(fileStat && fileStat.isDirectory()) {
        results = results.concat(this.walk(file));
      }else if(file && (file.endsWith('.js') || file.endsWith('.ts')) ) {
        results.push(file);
      }
    });
    return results;
  };


  get modules() {
    const results = this.walk(path.resolve(__dirname, "..", '..', "src"));
    return results
  }

  generate(modules) {
    const generatedDir = this.genPath;

    if (fs.existsSync(generatedDir)) {
      fs.rmSync(generatedDir, { recursive: true });
    }

    fs.mkdirSync(generatedDir);

    modules.forEach(
      (item) => {
        const relativePath = path.relative( path.resolve(__dirname, "..",'..','src'), item );

        const splitted = relativePath.split('/');


        const isRoot = splitted.indexOf('components') === 0;

        let loc = ''
        if (!isRoot) {
          loc = `${splitted[0]}/${splitted[1]}`;
          const dirName = path.resolve(generatedDir,loc);
          if (!fs.existsSync(dirName)) {
            fs.mkdirSync(dirName, { recursive: true });
          }
        }

        splitted.pop();
        const filename = splitted.pop();
        const template = templateGenerator(relativePath, filename, isRoot);


        fs.writeFileSync(
          path.resolve(generatedDir, loc, `${filename}.js`),
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
