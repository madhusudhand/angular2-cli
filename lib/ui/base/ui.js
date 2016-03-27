'use strict';

var cliSpinners = require('cli-spinners');
var logUpdate = require('log-update');
var Base = require('../../util/class-extend');
let colors = require('colors');

module.exports = Base.extend({
  init: function() {
    this.spinner = cliSpinners.dots;
    this.spinnerColor = 'black';
    this.frameIndex = 0;
    this.intervalId = 1;
    this.stream = process.stderr;
  },
  write: function(message) {
    console.log(message);
  },
  writeSuccess: function(message) {
    console.log(colors.green(message));
  },
  writeError: function(message) {
    console.log(colors.red(message));
  },
  startProgress: function(options){
    let _this = this;
    _this.spinnerColor = options.sprinnerColor || _this.spinnerColor;
    _this.spinner = cliSpinners[options.spinner] || _this.spinner;

    _this.intervalId = setInterval(function () {
      logUpdate(options.message + _this.getSpinnerFrame());
    }, _this.spinner.interval);
  },
  stopProgress: function(){
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.clear();
  },
  clear: function () {
    this.stream.clearLine();
    this.stream.cursorTo(0);
  },
  getSpinnerFrame: function() {
    this.frameIndex = ++this.frameIndex % this.spinner.frames.length;
    return this.spinner.frames[this.frameIndex];
  }
});
