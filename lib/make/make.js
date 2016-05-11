'use strict';

class Make {
  constructor(args) {
    Object.assign(this, {
      options : {
        path : './src/public',
      },
    }, args);
  }

  make() {
    throw new Error('Make needs to have run() defined.');
  }
}

module.exports = Make;
