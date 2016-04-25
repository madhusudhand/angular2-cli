const Promise = require('promise');

const Task = require('./task');
const npm = require('../../util/npm');
const errorFilter = require('../../util/error-filter');

class RunTask extends Task {
  constructor(args) {
    super(Object.assign({
      script: '',
      startMessage: '',
      errorMessage: '',
      showWarnings: false,
      showFullLog: false,
    }, args));
  }

  run(options) {
    const npmOptions = Object.assign({}, options);

    this.ui.write(this.startMessage);

    return npm('run', [this.script], npmOptions).
      progress(this.writeProgress.bind(this)).
      then(this.announceCompletion.bind(this)).
      fail(this.annouceFailure.bind(this));
  }

  announceCompletion(result) {
    this.ui.writeSuccess(this.completionMessage);
    const err = errorFilter(result.stderr, this.showWarnings).join('\n');
    if (err) {
      this.ui.write(err);
    }
  }

  annouceFailure(result) {
    this.ui.writeError(this.errorMessage);
    const err = errorFilter(result.stderr, this.showWarnings).join('\n');
    if (err) {
      this.ui.write(err);
    }
    return Promise.reject(err);
  }

  writeProgress(result) {
    const _this = this;
    result.stdout.on('data', (data) => {
      if (_this.showFullLog) {
        _this.ui.write(data);
      } else {
        const err = errorFilter(data, this.showWarnings).join('\n');
        if (err) {
          _this.ui.writeError(err);
        }
      }
    });

    result.stderr.on('data', (data) => {
      const err = errorFilter(data, this.showWarnings).join('\n');
      if (err) {
        _this.ui.writeError(err);
      }
    });
  }
}

module.exports = RunTask;
