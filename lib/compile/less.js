'use strict';

const gulp    = require('gulp');
const less    = require('gulp-less');
const cssmin  = require('gulp-cssmin');
const logger  = require('../ui/logger');

class LessCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const l = less(this.options);

    return new Promise((resolve, reject) => {
      l.on('error', (err) => {
        logger.writeError(err.message);
        reject('error');
      }).
      on('end', () => {
        resolve('success');
      });

      if (env === 'prod') {
        gulp.src(`${src}/**/*.less`)
        .pipe(l)
        .pipe(cssmin())
        .pipe(gulp.dest(dest));
      } else {
        gulp.src(`${src}/**/*.less`)
        .pipe(l)
        .pipe(gulp.dest(dest));
      }
    });
  }
}

module.exports = LessCompile;
