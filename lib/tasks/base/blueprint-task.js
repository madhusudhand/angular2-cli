const Promise = require('promise');
const path = require('path');
const fs = require('fs-extra');

const Task = require('./task');

class BlueprintTask extends Task {
  constructor(args) {
    super(Object.assign({
      flavor: '',
      startProgressMessage: '',
      completionMessage: '',
    }, args));
  }

  run(options) {
    // this.ui.startProgress(this.startProgressMessage);

    const copy = Promise.denodeify(fs.copy);
    const source = path.join(__dirname, '..', '..', '..', 'blueprints/ng2', this.flavor);
    return copy(source, options.dir).
      finally(this.finally.bind(this)).
      then(this.announceCompletion.bind(this));
  }

  finally() {
    // this.ui.stopProgress();
  }

  announceCompletion() {
    this.ui.writeSuccess(this.completionMessage);
  }
}

module.exports = BlueprintTask;
