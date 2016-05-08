'use strict';

const ServeTask = require('./base/serve-task');

class Serve extends ServeTask {
  constructor(args) {
    super(Object.assign({
      script: 'serve',
      startMessage: 'Serving the app on http://localhost:3000/',
      errorMessage: 'Error launching App.',
    }, args));
  }
}

module.exports = Serve;
