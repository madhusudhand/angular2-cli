'use strict';

const gulp = require('gulp');
const less = require('gulp-less');
const q = require('q');
// const logger = require('../util/logger');

class LessCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest) {
    const deferred = q.defer();
    const l = less(this.options);
    l.on('error', () => {
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