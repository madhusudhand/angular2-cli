'use strict';

var cliSpinners = require('cli-spinners');
var logUpdate = require('log-update');
var CoreObject = require('core-object');
let colors = require('colors');
let util = require('util');

module.exports = UiCore;

function UiCore() {
  // CoreObject.apply(this, arguments);

  console.log('ui core constructor');

  this.spinner = cliSpinners.dots;
  this.spinnerColor = 'black';
  this.frameIndex = 0;
  this.intervalId = 1;
  this.stream = process.stderr;
}

UiCore.__proto__ = CoreObject;
UiCore.prototype.constructor = UiCore;

// UiCore.prototype.spinner = cliSpinners.dots;
// UiCore.prototype.spinnerColor = 'black';
// UiCore.prototype.frameIndex = 0;
// UiCore.prototype.intervalId = 1;
// UiCore.prototype.stream = process.stderr;

UiCore.prototype.write = function(message) {
  console.log(message);
}

UiCore.prototype.startProgress = function(options){
  let _this = this;
  _this.spinnerColor = options.sprinnerColor || _this.spinnerColor;
  _this.spinner = cliSpinners[options.spinner] || _this.spinner;

  this.intervalId = setInterval(function () {
    logUpdate(options.message + _this.getSpinnerFrame());
  }, _this.spinner.interval);

  console.log(util.inspect(this.intervalId, {showHidden: false, depth: null}));
};

UiCore.prototype.stopProgress = function(){
  console.log(this.intervalId);
  console.log(util.inspect(this.intervalId, {showHidden: false, depth: null}));
  clearInterval(this.intervalId);
  this.intervalId = null;
  this.clear();
};

UiCore.prototype.clear = function () {
	this.stream.clearLine();
	this.stream.cursorTo(0);
};

UiCore.prototype.getSpinnerFrame = function() {
	this.frameIndex = ++this.frameIndex % this.spinner.frames.length;
	return this.spinner.frames[this.frameIndex];
}
