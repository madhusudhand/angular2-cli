'user strict';

module.exports = function npm(command, options) {
  var enpeem = require('enpeem');
  var Promise = require('promise');
  var operation = Promise.denodeify(enpeem[command]);

  return operation(options);
};
