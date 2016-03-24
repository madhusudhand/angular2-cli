'user strict';

module.exports = function npm(command, npmArgs, options) {
  var lib = require('npm');
  var Promise = require('promise');

  var load = Promise.denodeify(lib.load);

  return load(options)
    .then(function() {

      var operation = Promise.denodeify(lib.commands[command]);

      return operation(npmArgs || []);
    });
};
