const ServeCmd = require('../cmd-tasks/serve-cmd');

module.exports = function serve() {
  const cmd = new ServeCmd();
  cmd.run();
};
