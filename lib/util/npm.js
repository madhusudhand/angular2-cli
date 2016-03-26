'user strict';

module.exports = function npm(command, options) {
  var npmCommands = require('./npm-commands/npm-commands');
  var Promise = require('promise');
  var operation = Promise.denodeify(npmCommands[command]);

  return operation(options);
};
