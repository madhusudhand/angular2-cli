'use strict';

var CoreObject = require('core-object');

function Task() {
  CoreObject.apply(this, arguments);
}

Task.__proto__ = CoreObject;

Task.prototype.run = function(/*options*/) {
  throw new Error('Task needs to have run() defined.');
};

module.exports = Task;
