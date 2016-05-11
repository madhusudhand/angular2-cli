'use strict';

const _    = require('lodash');
const exec = require('child-process-promise').exec;

module.exports = function npm(command, args, options, runOptions) {
  function constructCommand(_command, _args, _options) {
    let cmd = 'npm ';
    const arg = _args.join(' ');
    const cmdOptions = Object.assign({}, _options, {
      // loglevel: 'error',
    });

    cmd += `${_command} ${arg}`;

    _.forEach(cmdOptions, (value, key) => {
      if (!value) {
        cmd += ` --${key} ${value}`;
      } else {
        cmd += ` --${key}`;
      }
    });
    return cmd;
  }

  const cmd = constructCommand(command, args, options);
  const cmdRunOptions = {};

  if (runOptions && runOptions.dir) {
    cmdRunOptions.cwd = runOptions.dir;
  }

  return exec(cmd, cmdRunOptions);
};
