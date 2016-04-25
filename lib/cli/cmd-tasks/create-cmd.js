const Promise = require('promise');
const path = require('path');

const Task = require('../../tasks/base/task');
const fsUtil = require('../../util/fs-util');
const ui = require('../../ui/progress-dots');
const BPInstallTask = require('../../tasks/blueprint-install');

class CreateCmd extends Task {
  run(options) {
    this.options = Object.assign({}, this.options, options);
    this.dir = this.createDir();
    if (this.dir === null) {
      return;
    }

    Promise.resolve(this.blueprintInstall());
  }

  createDir() {
    const dir = path.resolve(`./${this.options.appName}`);
    if (!fsUtil.dir.touch(dir)) {
      ui.writeError('Directory with same name already exists.');
      return null;
    }
    return dir;
  }

  blueprintInstall() {
    const blueprint = new BPInstallTask({
      ui,
    });

    return blueprint.run({ dir: this.dir });
  }
}

module.exports = CreateCmd;
