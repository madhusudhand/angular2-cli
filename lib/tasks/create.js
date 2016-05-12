'use strict';

const Promise = require('promise');
const path    = require('path');
const fs      = require('fs-extra');
const Task    = require('./task');

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

    return copy(source, options.dir).
      then(this.announceCompletion.bind(this)).
      catch(this.annouceFailure.bind(this));
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
