'use strict';

const DevServer = require('webpack-dev-server');

const Command = require('./command');
const ui      = require('../../ui/progress-dots');
const Build   = require('../../tasks/build');

class ServeCmd extends Command {
  run(options) {
    this.validate().
      then(() => Build.new({ ui, env: options.env }).run().
          then((compiler) => {
            const server = new DevServer(compiler, {
              contentBase        : './dist',
              hot                : true,
              historyApiFallback : true,
              quiet              : false,
              noInfo             : false,
              inline             : true,
              open               : true,
              stats              : { colors: true },
            });
            server.listen(3000, () => {
              ui.writeInfo('Server started: http://localhost:3000');
            });
          })
      );
  }
}

module.exports = (options) => {
  const env = options.prod ? 'prod' : 'dev';
  const cmd = new ServeCmd();
  cmd.run({ env });
};
