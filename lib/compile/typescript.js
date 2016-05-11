'use strict';

const gulp        = require('gulp');
const typescript  = require('gulp-typescript');
const q           = require('q');
const logger      = require('../util/logger');

class TsCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest) {
    const deferred = q.defer();
    const tsProject = typescript.createProject(`${src}/tsconfig.json`);

    const ts = typescript(tsProject);
    ts.on('error', (err) => {
      logger.writeInfo(err.message);
      deferred.reject('error');
      // ts.end();
    }).
    on('end', () => {
      deferred.resolve('success');
    });

    tsProject.src()
    .pipe(ts)
    .js
    .pipe(gulp.dest(dest));

    return deferred.promise;
  }
}

module.exports = TsCompile;
