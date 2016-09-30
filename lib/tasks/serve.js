'use strict';

const Promise        = require('bluebird');
const DevServer      = require('webpack-dev-server');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

const Task           = require('./task');
const serverConfig   = require('../webpack/config/server.config');

class Serve extends Task {

  constructor(args) {
    super(Object.assign({
      env : 'dev',
    }, args));
  }

  run(options) {
    const _this = this;
    _this.options = Object.assign({}, options.serveOptions);

    return new Promise(() => {
      // Neither resolving nor rejecting as server starts in watch mode
      _this.startServer(_this.options.compiler);
    });
  }

  startServer(compiler) {
    const _this = this;
    compiler.apply(new ProgressPlugin({
      profile : true,
      colors  : true,
    }));

    const server = new DevServer(compiler, serverConfig.devServerOptions);

    server.listen(serverConfig.port, () => {
      _this.ui.writeSuccess(`\n\n Server started : http://${serverConfig.host}:${serverConfig.port}\n`);
    });
  }
}

module.exports = {
  new : (args) => new Serve(args),
};
