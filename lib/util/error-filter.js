'use strict';

var _ = require('lodash');

module.exports = function errorFilter(str, warnings){
  var errLines = str.split('\n');
  var errorLabels = ['ERR ', 'ERR!', 'ERROR'];
  if (warnings) {
    errorLabels.push('WARN');
    errorLabels.push('WARNING');
  }

  return _.filter(errLines, function (line) {
    return _.some(errorLabels, function(err) {
      return ~line.toUpperCase().indexOf(err);
    })
  })
}
