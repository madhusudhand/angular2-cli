/* eslint-disable no-console */

const cli     = require('commander');
const pkg     = require('../../package.json');
const ng2     = require('export-files')(`${__dirname}/commands`);
const colors  = require('colors');

cli.name = 'ng2';
cli.version(pkg.version)
  .usage('<command> [options]');

cli.command('create <app-name>')
  .description('Create angular app')
  .option('-c, --css-processor    <sass/less>', 'CSS pre-processor [default: sass]', 'sass')
  .option('    --surge', 'Create surge.sh deployable app')
  .action((appName, options) => {
    ng2.create(appName, {
      cssProcessor : options.cssProcessor,
      surge        : options.surge,
    });
  });

cli.command('init')
  .description('Initialize and install dependancies')
  .action(() => {
    ng2.init();
  });

cli.command('build')
  .description('Build the app')
  .option('    --dev', 'Development mode [default]')
  .option('    --prod', 'Production mode')
  .action((options) => {
    ng2.build(options);
  });

cli.command('serve')
  .description('Build and run the app')
  .option('    --dev', 'Development mode [default]', 'true')
  .option('    --prod', 'Production mode', 'true')
  .action((options) => {
    ng2.serve(options);
  });

cli.command('test')
  .description('Run unit tests')
  .action(() => {
    ng2.test();
  });

cli.command('make <scaffold> <scaffold-name>')
  .description('Generate scaffolds')
  .on('--help', () => {
    console.log('  Scaffolds:\n');
    console.log('    component <path/component-name>');
    console.log('    directive <path/directive-name>');
    console.log('    pipe      <path/pipe-name>');
    console.log('    service   <path/service-name>');
    console.log('    route     <route-name>\n');
  })
  .action((scaffold, scaffoldName) => {
    ng2.make(scaffold, scaffoldName);
  });

cli.arguments('<cmd>')
  .action((cmd) => {
    console.log(
        `\n ${colors.red(`[ERROR] - Invalid command: ${cmd}`)}
        \n Run "ng2 --help" for a list of available commands.\n`
      );
    process.exit(0);
  });

cli.parse(process.argv);
Error.stackTraceLimit = Infinity;

if (!cli.args.length) {
  cli.parse([process.argv[0], process.argv[1], '-h']);
  process.exit(0);
}
