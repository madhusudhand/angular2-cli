const CreateCmd = require('../cmd-tasks/create-cmd');

module.exports = function create(appName, options) {
  const cmd = new CreateCmd();
  cmd.run(Object.assign({}, options, {
    appName,
  }));
};
