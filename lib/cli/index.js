'use strict';

// let path = require('path');
let program = require('commander');
const pkg = require('../../package.json');
const ng2 = require('export-files')(__dirname + '/commands');

program.name = 'ng2';
program
  .version(pkg.version)
  .usage('<command> [options]');

// init command
program
  .command('init <project-name>')
  // .description('create angular2 project')
  .action(function (projectName) {
    ng2.init(projectName);
  });

// serve command
program
  .command('serve')
  .option('-d, --disconnected', 'Do not auto refresh browser')
  .action(function () {
    console.log('This is not implemented yet!!');
  });

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}
