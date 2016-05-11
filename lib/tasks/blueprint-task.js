'use strict';

const Promise = require('promise');
const path    = require('path');
const fs      = require('fs-extra');
const Task    = require('./base/task');

class BlueprintTask extends Task {
  constructor(args) {
    super(Object.assign({
      startProgressMessage : 'Creating app',
      completionMessage    : 'App created.',
      failureMessage       : 'App creation failed.',
    }, args));
  }

  run(options) {
    // this.ui.startProgress(this.startProgressMessage);

    const copy = Promise.denodeify(fs.copy);
    const commonSource = path.join(__dirname, '..', '..', 'blueprints', 'ng2');

    return copy(commonSource, options.dir).
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

module.exports = BlueprintTask;
