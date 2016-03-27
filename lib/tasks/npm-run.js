'use strict';

let Task = require('./base/task');
let npm = require('../util/npm');
let objectAssign = require('object-assign');

module.exports = Task.extend({
  init: function() {

  },
  run: function(options) {
    let npmOptions = objectAssign(options, {
      script: 'start'
    });

    return npm('run', npmOptions);
  }
});
