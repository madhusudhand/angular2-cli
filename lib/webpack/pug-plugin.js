'use strict';

const pug = require('pug');
const fs  = require('fs-extra');
const path = require('path');

function PugPlugin(options) {
  // Setup the plugin instance with options...
  this.options = options;
}

function applyPlugin(compiler) {
  compiler.plugin('compilation', () => {
    const options = Object.assign({
      filename     : this.options.index,
      compileDebug : this.debug || false,
    });

    fs.readFile(this.options.index, (err, c) => {
      const content = pug.compile(c, options)({});
      const filename = path.join(this.options.outDir, path.basename(this.options.index, '.pug'));
      fs.writeFile(`${filename}.html`, content);
    });
  });

  compiler.plugin('done', () => {
  });
}

PugPlugin.prototype.apply = applyPlugin;

module.exports = PugPlugin;
