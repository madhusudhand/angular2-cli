'use strict';

class Task {
  constructor(args) {
    Object.assign(this, args);
  }

  run() {
    throw new Error('Task needs to have run() defined.');
  }
}

module.exports = Task;
