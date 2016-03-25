'use strict';

var cliSpinners = require('cli-spinners');
var logUpdate = require('log-update');
var CoreObject = require('core-object');



var UiCore = CoreObject.extend({
  interval: 200,
  spinnerFrames: cliSpinners.dots.frames,
  frameIndex: 0,
  intervalId: undefined
});

// function UiCore() {
//   CoreObject.apply(this, arguments);
// }

// UiCore.__proto__ = CoreObject;

UiCore.prototype.write = function(message) {
  console.log(message);
  console.log(this.spinnerFrames);
}

UiCore.prototype.writeUpdate = function(message){
  this.intervalId = setInterval(function () {
    logUpdate(message);
  }, this.interval);
};

UiCore.prototype.writeNext = function(message){
  this.stopUpdate();
  this.intervalId = setInterval(function () {
    logUpdate(message);
  }, this.interval);
};

UiCore.prototype.stopUpdate = function(){
  clearInterval(this.intervalId);
};

UiCore.prototype.clear = function () {
	this.stream.clearLine();
	this.stream.cursorTo(0);
};

UiCore.prototype.spinner = function() {
	this.frameIndex = ++this.frameIndex % this.spinnerFrames.length;
	return this.spinnerFrames[this.frameIndex];
}

module.exports = UiCore;
