'use strict';

let TestTask = require('../cmd-tasks/test-cmd');

module.exports = function test() {

  let test = new TestTask();
  test.run({});

};
