'use strict';

var CoreObject = require('core-object');

function Util() {
  CoreObject.apply(this, arguments);
}

Util.__proto__ = CoreObject;

module.exports = Util;
