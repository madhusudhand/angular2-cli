'use strict';

const ServeTask = require('./run-task');

class Test extends ServeTask {
  constructor(args) {
    super(Object.assign({
      script       : 'test',
      startMessage : 'Running Tests',
      errorMessage : 'Error running tests.',
      showFullLog  : true,
    }, args));
  }
}

module.exports = Test;
