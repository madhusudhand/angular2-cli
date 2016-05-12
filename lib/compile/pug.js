'use strict';

const gulp    = require('gulp');
const pug     = require('gulp-pug');
const q       = require('q');
const logger  = require('../ui/logger');

class PugCompile {
  constructor(options) {
    this.options = Object.assign({
      pretty : true,
    }, options);
  }

  compile(src, dest) {
    const deferred = q.defer();
    const p = pug(this.options);
    p.on('error', (err) => {
      logger.writeError(err.message);
      deferred.reject('error');
      // p.end();
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
