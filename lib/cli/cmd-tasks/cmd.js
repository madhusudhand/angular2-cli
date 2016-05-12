'use strict';

class Command {
  constructor(args) {
    Object.assign(this, args);
  }

  run() {
    throw new Error('Cmd needs to have run() defined.');
  }
}

module.exports = Command;
