'use strict';

const path = require('path');
const pkg  = require('../../util/pkg');
const ui   = require('../../ui/progress-dots');

class Command {
  constructor(args) {
    Object.assign(this, args);
  }

  run() {
    throw new Error('Cmd needs to have run() defined.');
  }

  validate() {
    this.appDir = path.resolve('./');
    return pkg.read(this.appDir).
    then((data) => {
      if (!data['angular2-cli']) {
        // || !data.devDependencies['angular2-cli']
        return Promise.reject();
      }
      return Promise.resolve(data);
    }).
    catch(() => {
      ui.writeError('\nYou have to be inside an angular2-cli project to run this command.\n');
      return Promise.reject();
    });
  }
}

module.exports = Command;
