'use strict';

const Promise = require('promise');
const path    = require('path');
const fs      = require('fs-extra');
const Task    = require('./task');
const _       = require('lodash');

class Create extends Task {
  constructor(args) {
    super(Object.assign({
      startProgressMessage : 'Creating app',
      completionMessage    : 'App created.',
      failureMessage       : 'App creation failed.',
    }, args));
  }

  run(options) {
    const copy = Promise.denodeify(fs.copy);
    const source = path.join(__dirname, '..', '..', 'blueprints', 'ng2');
    this.dir = options.dir;

    return copy(source, options.dir).
      then(this.postInstall.bind(this)).
      then(this.announceCompletion.bind(this)).
      catch(this.annouceFailure.bind(this));
  }

  postInstall() {
    return Promise.all([
      this._processFile('package.json', { appName: path.normalize(this.dir) }),
      this._processFile('README.md', { appName: path.normalize(this.dir) }),
    ]);
  }

  _processFile(file, placeholders) {
    const fullPath = `${this.dir}/${file}`;
    fs.readFile(fullPath, (err, data) => {
      const tpl = _.template(data);
      fs.writeFile(fullPath, tpl(placeholders));
    });
  }

  announceCompletion() {
    this.ui.writeSuccess(this.completionMessage);
  }

  annouceFailure() {
    this.ui.writeError(this.failureMessage);
  }
}

module.exports = {
  new : (args) => new Create(args),
};
