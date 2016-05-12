'use strict';

const Ui = require('./base-ui');

class ProgressDots extends Ui {
  startProgress(message) {
    super.startProgress({
      message,
      spinner : 'simpleDots',
    });
  }
}

module.exports = new ProgressDots();
