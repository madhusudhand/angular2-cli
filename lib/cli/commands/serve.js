'use strict';

const Command = require('./command');
const ui      = require('../../ui/progress-dots');
const Build   = require('../../tasks/build');
const Serve   = require('../../tasks/serve');

class ServeCmd extends Command {
  run(options) {
    this.validate().
      then(() => Build.new({ ui, env: options.env, serve: true }).run().
                 then((serveOptions) => Serve.new({ ui, env: options.env }).run({ serveOptions }))
      );
  }
}

module.exports = (options) => {
  const env = options.prod ? 'prod' : 'dev';
  const cmd = new ServeCmd();
  cmd.run({ env });
};
