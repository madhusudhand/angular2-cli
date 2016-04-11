'use strict';

let path = require('path');
let ServeTask = require('../cmd-tasks/serve-cmd');

module.exports = function serve() {

  let serve = new ServeTask();
  serve.run({});

};
