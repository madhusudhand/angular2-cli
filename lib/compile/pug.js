'use strict';

const gulp    = require('gulp');
const pug     = require('gulp-pug');
const q       = require('q');
const logger  = require('../ui/logger');

class PugCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const deferred = q.defer();
    this.options.pretty = env === 'prod';

    const p = pug(this.options);
    p.on('error', (err) => {
      logger.writeError(err.message);
      deferred.reject('error');
    })
    .on('end', () => {
      deferred.resolve('success');
    });

    gulp.src(`${src}/**/*.pug`)
    .pipe(p)
    .pipe(gulp.dest(dest));

    return deferred.promise;
  }
}

module.exports = PugCompile;
