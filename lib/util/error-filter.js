const _ = require('lodash');

module.exports = function errorFilter(str, warnings) {
  const errLines = str.split('\n');
  const errorLabels = ['ERR ', 'ERR!', 'ERROR'];
  if (warnings) {
    errorLabels.push('WARN');
    errorLabels.push('WARNING');
  }

  return _.filter(errLines, (line) =>
    _.some(errorLabels, (err) =>
      ~line.toUpperCase().indexOf(err)));
};
