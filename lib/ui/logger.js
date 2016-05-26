'use strict';

const _  = require('lodash');
const Ui = require('./base-ui');

class Logger extends Ui {
  logErrors(msg) {
    const result = this._filter(msg).join('\n');
    if (result) {
      this.ui.writeError(result);
    }
    return result;
  }

  logWarnings(msg) {
    const result = this._filter(msg, true).join('\n');
    if (result) {
      this.ui.writeWarning(result);
    }
    return result;
  }

  logCreate(path) {
    this.writeInfo(this.colors.green('  Create  ') + path);
  }

  _filter(str, warnings) {
    const errLines = str.split('\n');
    const errorLabels = ['ERR ', 'ERR!', 'ERROR'];
    if (warnings) {
      errorLabels.push('WARN');
      errorLabels.push('WARNING');
    }

    return _.filter(errLines, (line) =>
      _.some(errorLabels, (err) =>
        ~line.toUpperCase().indexOf(err)));
  }
}

module.exports = new Logger();
