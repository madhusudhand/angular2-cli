'use strict';

let path = require('path');
let ServeTask = require('../cmd-tasks/serve-task');

module.exports = function serve() {

  let serve = new ServeTask();
  serve.run({});

};
