/* eslint-disable no-console */

'use strict';

const cliSpinners = require('cli-spinners');
const logUpdate   = require('log-update');
const colors      = require('colors');

class BaseClass {
  constructor(args) {
    Object.assign(this, {
      spinner      : cliSpinners.dots,
      spinnerColor : 'black',
      frameIndex   : 0,
      intervalId   : undefined,
      colors,
    }, args);
  }

  writeInfo(message) {
    console.log(message);
  }

  writeSuccess(message) {
    console.log(colors.green(message));
  }

  writeWarning(message) {
    console.log(colors.red(message));
  }

  writeError(message) {
    console.log(colors.red(message));
  }

  startProgress(options) {
    const _this = this;
    _this.spinnerColor = options.sprinnerColor || _this.spinnerColor;
    _this.spinner = cliSpinners[options.spinner] || _this.spinner;

    _this.intervalId = setInterval(() => {
      logUpdate(colors.blue(options.message + _this.getSpinnerFrame()));
    }, _this.spinner.interval);
  }

  stopProgress() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.clear();
  }

  clear() {
    logUpdate.clear();
  }

  getSpinnerFrame() {
    this.frameIndex = ++this.frameIndex % this.spinner.frames.length;
    return this.spinner.frames[this.frameIndex];
  }
}

module.exports = BaseClass;
