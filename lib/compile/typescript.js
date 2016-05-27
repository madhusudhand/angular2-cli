'use strict';

const gulp        = require('gulp');
const typescript  = require('gulp-typescript');
const sourcemaps  = require('gulp-sourcemaps');
const Builder     = require('systemjs-builder');
const q           = require('q');
const logger      = require('../ui/logger');

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
      // deferred.resolve('success');
    });

    if (this.options.env === 'prod') {
      tsProject.src()
      .pipe(ts)
      .js
      .pipe(gulp.dest(dest));

      this.bundle().
        then(() => {
          deferred.resolve('success');
        });
    } else {
      tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(ts)
      .js
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest));
    }

    return deferred.promise;
  }

  bundle() {
    const relativeRoot = './dist';
    const builder = new Builder('./dist', './dist/system-config.js');
    return Promise.all([
      builder.bundle(
          'bootstrap.js - [public/**/*]',
          `${relativeRoot}/bootstrap.js`,
          { minify: true, sourceMaps: false }
        ),
      // builder.bundle(
      //     'public - (public/**/*.js - [public/**/*.js])',
      //     `${relativeRoot}/public/index.js`,
      //     { minify: true, sourceMaps: false }
      //   ),
    ]);
  }

  clean() {

  }
}

module.exports = TsCompile;
