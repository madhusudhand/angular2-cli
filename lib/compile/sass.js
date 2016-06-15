'use strict';

const gulp    = require('gulp');
const sass    = require('gulp-sass');
const cssmin  = require('gulp-cssmin');
const logger  = require('../ui/logger');

class SassCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const s = sass(this.options);

    return new Promise((resolve, reject) => {
      s.on('error', (err) => {
        logger.writeError(err.message);
        reject('error');
      }).
      on('end', () => {
        resolve('success');
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
    });
  }
}

module.exports = SassCompile;
