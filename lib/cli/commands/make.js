'use strict';

const MakeCmd = require('../cmd-tasks/make-cmd');

module.exports = function create(scaffold, name, options) {
  MakeCmd.new().run(Object.assign({}, options, {
    scaffold,
    name,
  }));
};
