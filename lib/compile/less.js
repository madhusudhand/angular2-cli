'use strict';

const gulp    = require('gulp');
const less    = require('gulp-less');
const q       = require('q');
const logger  = require('../ui/logger');

class LessCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest) { // 3: env
    const deferred = q.defer();
    const l = less(this.options);
    l.on('error', (err) => {
      logger.writeError(err.message);
      deferred.reject('error');
      // l.end();
    }).
    on('end', () => {
      deferred.resolve('success');
    });

    gulp.src(`${src}/**/*.less`)
    .pipe(l)
    .pipe(gulp.dest(dest));
  }
}

module.exports = LessCompile;
