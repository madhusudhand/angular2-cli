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
  .command('init <app-name>')
  // .description('create angular2 project')
  .action(function (appName) {
    ng2.init(appName);
  });

// serve command
program
  .command('serve')
  // .option('-d, --disconnected', 'Do not auto refresh browser')
  .action(function () {
    ng2.serve();
  });

program
  .command('test')
  // .option('-d, --disconnected', 'Do not auto refresh browser')
  .action(function () {
    ng2.test();
  });

program.parse(process.argv);

// infinite stack traces
Error.stackTraceLimit = Infinity;

if (!program.args.length) {
  program.help();
}
