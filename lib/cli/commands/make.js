'use strict';

const MakeCmd = require('../cmd-tasks/make-cmd');

module.exports = function create(scaffold, name, options) {
  const cmd = new MakeCmd();
  cmd.run(Object.assign({}, options, {
    scaffold,
    name,
  }));
};
