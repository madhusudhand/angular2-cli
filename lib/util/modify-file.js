const through = require('through2');

function modify(fn) {
  return through.obj((file, enc, cb) => {
    const _file = file;
    const contents = fn(String(_file.contents), _file.path, _file);

    if (contents && _file.isBuffer()) {
      _file.contents = new Buffer(contents);
    }

    cb(null, _file);
  });
}

module.exports = modify;
