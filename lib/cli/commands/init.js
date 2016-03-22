'use strict';

let path = require('path');
let spawn = require('child_process').spawn;

module.exports = function init(argv) {
  argv = argv || [];
  const command = 'somecommand ' + argv.join(' ');
  console.log(command);

  // process.env.NODE_PATH += ':' + path.join(__dirname, '..', '..', 'node_modules');

  // return spawn('sh', ['-c', command], { stdio: 'inherit' });
};
