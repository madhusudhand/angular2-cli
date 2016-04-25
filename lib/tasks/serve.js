const ServeTask = require('./base/run-task');

class Serve extends ServeTask {
  constructor(args) {
    super(Object.assign({
      script: 'start',
      startMessage: 'Serving the app on http://localhost:3000/',
      errorMessage: 'Error launching App.',
    }, args));
  }
}

module.exports = Serve;
