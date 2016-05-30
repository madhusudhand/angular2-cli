'use strict';

const gulp    = require('gulp');
const sass    = require('gulp-sass');
const cssmin  = require('gulp-cssmin');
const q       = require('q');
const logger  = require('../ui/logger');

class SassCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const deferred = q.defer();
    const s = sass(this.options);
    s.on('error', (err) => {
      logger.writeError(err.message);
      deferred.reject('error');
    }).
    on('end', () => {
      deferred.resolve('success');
    });

    if (env === 'prod') {
      gulp.src(`${src}/**/*.scss`)
      .pipe(s)
      .pipe(cssmin())
      .pipe(gulp.dest(dest));
    } else {
      gulp.src(`${src}/**/*.scss`)
      .pipe(s)
      .pipe(gulp.dest(dest));
    }

    return deferred.promise;
  }
}

module.exports = SassCompile;
