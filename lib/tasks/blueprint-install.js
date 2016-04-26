const BpTask = require('./base/blueprint-task');

class BlueprintInstall extends BpTask {
  constructor(args) {
    super(Object.assign({
      startProgressMessage: 'Creating app',
      completionMessage: 'App created.',
      failureMessage: 'App creation failed.',
    }, args));
  }
}

module.exports = BlueprintInstall;
