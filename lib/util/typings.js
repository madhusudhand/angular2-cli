'user strict';

var exec = require('child-process-promise').exec;

module.exports = function typings(command, args, options, runOptions) {
  var cmd = constructCommand(command, args, options);
  var cmdRunOptions = {};

  if (runOptions && runOptions.dir) {
    cmdRunOptions.cwd = runOptions.dir
  }

  return exec(cmd, cmdRunOptions);

  function constructCommand(command, args, options) {
    var cmd = 'typings ';
    cmd += command + ' ' + args.join(' ');
    for (var key in options) {
      if (options[key] !== undefined) {
        cmd += ' --' + key + '=' + options[key];
      }
    }
    return cmd;
  }
};
