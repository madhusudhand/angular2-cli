const cli = require('commander');
const pkg = require('../../package.json');
const ng2 = require('export-files')(`${__dirname}/commands`);

cli.name = 'ng2';
cli.version(pkg.version)
  .usage('<command> [options]');

cli.command('create <app-name>')
  .option('-t, --task-runner      <grunt/gulp>', 'Task runner       [default: grunt]', 'grunt')
  .option('-c, --css-processor    <sass/less>', 'CSS pre-processor [default: sass]', 'sass')
  .action((appName, options) => {
    ng2.create(appName, {
      taskRunner: options.taskRunner,
      cssProcessor: options.cssProcessor,
    });
  });

cli.command('init')
  .action(() => {
    ng2.init();
  });

cli.command('serve')
  .action(() => {
    ng2.serve();
  });

cli.command('test')
  .action(() => {
    ng2.test();
  });

cli.parse(process.argv);
Error.stackTraceLimit = Infinity; // infinite stack traces

if (!cli.args.length) {
  cli.parse([process.argv[0], process.argv[1], '-h']);
  process.exit(0);
} else {
  // const validCommands = cli.commands.map(function (cmd) {
  //   return cmd.name;
  // });
  // const invalidCommands = cli.args.filter(function (cmd) {
  //   // if command executed it will be an object and not a string
  //   return (typeof cmd === 'string' && validCommands.indexOf(cmd) === -1);
  // });
  // if (invalidCommands.length) {
  //   console.log(
  //     '\n [ERROR] - Invalid command: "%s". Run "ng2 --help" for a list of available commands.\n',
  //     invalidCommands.join(' ')
  //   );
  //   process.exit(0);
  // }
}
