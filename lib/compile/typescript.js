'use strict';

const gulp        = require('gulp');
const typescript  = require('gulp-typescript');
const preprocess  = require('gulp-preprocess');
const sourcemaps  = require('gulp-sourcemaps');
const Builder     = require('systemjs-builder');

class TsCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const _this = this;
    const tsProject = typescript.createProject(`${src}/tsconfig.json`);
    _this.failed = false;

    const ts = typescript(tsProject);

    return new Promise((resolve, reject) => {
      ts.on('error', () => {
        _this.failed = true;
        reject('error');
      });

      if (env === 'prod') {
        tsProject.src()
        .pipe(preprocess({ context: { ENV: 'prod' } }))
        .pipe(ts)
        .js
        .pipe(gulp.dest(dest))
        .on('end', () => {
          if (!_this.failed) {
            _this.bundle().
              then(() => {
                resolve('success');
              }).
              catch(() => {
                reject('error');
              });
          }
        });
      } else {
        tsProject.src()
        .pipe(preprocess({ context: { ENV: 'dev' } }))
        .pipe(sourcemaps.init())
        .pipe(ts)
        .js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(dest))
        .on('end', () => {
          if (!_this.failed) {
            resolve('success');
          }
        });
      }
    });
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
