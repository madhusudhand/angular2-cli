'user strict';

var exec = require('child-process-promise').exec;

module.exports = function npm(npmCommand, runOptions) {
  var cmd = constructCommand(npmCommand.command, npmCommand.args, npmCommand.options);
  // var errors = '';

  return exec(cmd, {
    cwd: runOptions.dir
  })
  .progress(function (childProcess) {
    // childProcess.stderr.pipe(process.stderr);
    // childProcess.stderr.on('data', function (data) {
    //   errors += data + '\n';
    // });
  });

  function constructCommand(command, args, options) {
    var cmd = 'npm ';
    cmd += command + ' ' + args.join(' ');
    for (var key in options) {
      if (options[key] !== undefined) {
        cmd += ' --' + key + '=' + options[key];
      }
    }
    return cmd;
  }
};
