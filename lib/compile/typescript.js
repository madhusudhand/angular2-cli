'use strict';

const path        = require('path');
const fs          = require('fs-extra');
const Promise     = require('bluebird');
const gulp        = require('gulp');
const typescript  = require('gulp-typescript');
const sourcemaps  = require('gulp-sourcemaps');
const Builder     = require('systemjs-builder');
const modifyFile  = require('../util/modify-file');

class TsCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
    this.env = {
      path : path.resolve('./src/app/environment.ts'),
    };
  }

  compile(src, dest, env) {
    const _this = this;
    this.env.content = this.getEnvFileContent(env || 'dev');
    const tsProject = typescript.createProject(`${src}/tsconfig.json`);
    _this.failed = false;

    const ts = typescript(tsProject);

    return new Promise((resolve, reject) => {
      ts.on('error', () => {
        _this.failed = true;
        reject('error');
      });

      if (env === 'prod') {
        gulp.src('src/**/*.ts')
        .pipe(modifyFile(_this.replace.bind(_this)))
        .pipe(ts)
        .js
        .pipe(gulp.dest(dest))
        .on('end', () => {
          if (!_this.failed) {
            _this.bundle().
              then(() => _this.clean()).
              then(() => {
                resolve('success');
              }).
              catch((e) => {
                reject(e);
              });
          }
        });
      } else {
        gulp.src('src/**/*.ts')
        .pipe(modifyFile(_this.replace.bind(_this)))
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

  replace(content, filePath, file) {
    const name = file.history[0];
    if (name === this.env.path) {
      return this.env.content;
    }
    return null;
  }

  getEnvFileContent(env) {
    return fs.readFileSync(`./src/environments/environment.${env}.ts`);
  }

  bundle() {
    const relativeRoot = './dist';
    const builder = new Builder('./dist', './dist/system-config.js');
    return Promise.all([
      builder.bundle(
          'main.js',
          `${relativeRoot}/main.js`,
          { minify: true, sourceMaps: false }
        ),
    ]);
  }

  clean() {
    const remove = Promise.promisify(fs.remove);
    return Promise.all([
      remove('./dist/vendor/@angular'),
      remove('./dist/vendor/rxjs'),
    ]);
  }
}

module.exports = TsCompile;
