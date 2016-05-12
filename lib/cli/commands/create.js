'use strict';

const CreateCmd = require('../cmd-tasks/create-cmd');

module.exports = function create(appName, options) {
  CreateCmd.new().run(Object.assign({}, options, {
    appName,
  }));
};
