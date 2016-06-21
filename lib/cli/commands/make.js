'use strict';

const _         = require('lodash');
const Command   = require('./command');
const ui        = require('../../ui/progress-dots');
const scaffold  = require('../../make/scaffold');

class MakeCmd extends Command {
  run(options) {
    this.options = Object.assign({}, this.options, options);

    this.validate().
      then(() => {
        scaffold.create(this.options.scaffold).make(this.options);
      });
  }

  validate() {
    return super.validate().
      then(() => {
        const scaffolds = ['component', 'directive', 'pipe', 'service', 'route'];
        const helpText = 'Run "ng2 make --help" for available options.';
        if (!_.some(scaffolds, (option) => option === this.options.scaffold)) {
          ui.writeError(`\nScaffold [${this.options.scaffold}]: is not a valid.`);
          ui.writeInfo(`${helpText}\n`);
          return Promise.reject();
        }
        return Promise.resolve();
      });
  }
}

module.exports = function create(scaffoldType, scaffoldName, options) {
  const cmd = new MakeCmd();
  cmd.run(Object.assign({}, options, {
    scaffold    : scaffoldType,
    pathAndName : scaffoldName,
  }));
};
