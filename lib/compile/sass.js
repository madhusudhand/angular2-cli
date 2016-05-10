'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass');
const q = require('q');
const logger = require('../util/logger');

class SassCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest) {
    const deferred = q.defer();
    const s = sass(this.options);
    s.on('error', (err) => {
      logger.writeError(err.message);
      deferred.reject('error');
      // s.end();
    }).
    on('end', () => {
      deferred.resolve('success');
    });

    gulp.src(`${src}/**/*.scss`)
    .pipe(s)
    .pipe(gulp.dest(dest));

    return deferred.promise;
  }
}

module.exports = SassCompile;
