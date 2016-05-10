'use strict';

const _ = require('lodash');
const Task = require('../../tasks/base/task');
const ui = require('../../ui/progress-dots');

class MakeCmd extends Task {
  run(options) {
    this.options = Object.assign({}, this.options, options);

    if (!this.isValidCommand()) {
      return;
    }

    // do something
    ui.writeInfo('Implementation is in progress.');
  }

  isValidCommand() {
    const scaffolds = ['component', 'directive', 'pipe', 'service', 'route'];
    const helpText = 'Run "ng2 make --help" for available options.';
    if (!_.some(scaffolds, (option) => option === this.options.scaffold)) {
      ui.writeError(`Scaffold [${this.options.scaffold}]: is not a valid. \n${helpText}`);
      return false;
    }
    return true;
  }

}

module.exports = MakeCmd;