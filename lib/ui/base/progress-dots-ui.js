'use strict';

const Ui = require('./ui');

class ProgressDots extends Ui {
  startProgress(message) {
    super.startProgress({
      message,
      spinner: 'simpleDots',
    });
  }
}

module.exports = ProgressDots;
