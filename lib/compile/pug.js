'use strict';

const gulp    = require('gulp');
const pug     = require('gulp-pug');
const logger  = require('../ui/logger');

class PugCompile {
  constructor(options) {
    this.options = Object.assign({}, options);
  }

  compile(src, dest, env) {
    const _this = this;
    return new Promise((resolve, reject) => {
      _this.options.pretty = env !== 'prod';

      const p = pug(_this.options);
      p.on('error', (err) => {
        logger.writeError(err.message);
        reject('error');
      })
      .on('end', () => {
        resolve('success');
      });

      gulp.src(`${src}/**/*.pug`)
      .pipe(p)
      .pipe(gulp.dest(dest));
    });
  }
}

module.exports = PugCompile;
