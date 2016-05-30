'use strict';

const gulp        = require('gulp');
const typescript  = require('gulp-typescript');
const sourcemaps  = require('gulp-sourcemaps');
const Builder     = require('systemjs-builder');
const q           = require('q');

class TsCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const _this = this;
    const deferred = q.defer();
    const tsProject = typescript.createProject(`${src}/tsconfig.json`);
    _this.failed = false;

    const ts = typescript(tsProject);
    ts.on('error', () => {
      // logger.writeInfo(err.message);
      _this.failed = true;
      deferred.reject('error');
    });

    if (env === 'prod') {
      tsProject.src()
      .pipe(ts)
      .js
      .pipe(gulp.dest(dest))
      .on('end', () => {
        if (!_this.failed) {
          _this.bundle().
            then(() => {
              deferred.resolve('success');
            }).
            catch(() => {
              deferred.reject('error');
            });
        }
      });
    } else {
      tsProject.src()
      .pipe(sourcemaps.init())
      .pipe(ts)
      .js
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(dest));

      deferred.resolve('success');
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
