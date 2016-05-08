'use strict';

const Promise = require('promise');
const browserSync = require('browser-sync').create();
const historyApiFallback = require('connect-history-api-fallback');
const gulp = require('gulp');
// const watch = require('gulp-watch');
const ts = require('gulp-typescript');

const Task = require('./task');
const errorFilter = require('../../util/error-filter');
const globals = require('../../cli/globals');
// const npm = require('../../util/npm');

class RunTask extends Task {
  constructor(args) {
    super(Object.assign({
      script: '',
      startMessage: '',
      errorMessage: '',
      showWarnings: false,
      showFullLog: false,
    }, args));
  }

  run(options) {
    this.npmOptions = Object.assign({}, options);
    this.ui.write(this.startMessage);

    this.startBrowserSync();
    // try {
    //   console.log('watching...');
    //   // this.watch();
    // } catch (e) {
    //   console.log(e);
    // }

    // return npm('run', [this.script], npmOptions).
    //   progress(this.writeProgress.bind(this)).
    //   then(this.announceCompletion.bind(this)).
    //   fail(this.annouceFailure.bind(this));
    return Promise.resolve();
  }

  notify(data) {
    console.log(data);
  }

  watch() {
    const _this = this;
    const tsProject = ts.createProject('./src/tsconfig.json');

    gulp.task('ts', () => {
      tsProject.src()
        // .pipe(sourcemaps.init())
        .pipe(ts(tsProject))
        // .pipe(sourcemaps.write());
        .js
        .pipe(gulp.dest('dist'))
        .pipe(_this.notify('gulp task executed'))
        .on('data', _this.notify('gulp task on data'))
        .on('error', _this.notify('gulp task on error'));
    });

    // gulp.watch([config.app_dir + '/*.jade', config.app_dir + '/**/*.jade'], ['jade:dev']);
    // gulp.watch([config.app_dir + '/*.scss', config.app_dir + '/**/*.scss'], ['sass:dev']);
    gulp.watch(['src/*.ts', 'src/**/*.ts'], ['ts']);

    gulp.on('stop', () => {
      // browserSync.reload({ stream: true });
    });

    gulp.on('data', () => {
      console.log('on data of gulp');
      // process.stdout.write(chunk.contents);
      // const contents = chunk.contents.toString().trim();
      // const bufLength = process.stdout.columns;
      // const hr = `\n\n${Array(bufLength).join('_')}\n\n`;
      // if (contents.length > 1) {
      //   process.stdout.write(`${chunk.path}\n${contents}\n`);
      //   process.stdout.write(chunk.path + hr);
      // }
    });
  }

  startBrowserSync() {
    browserSync.init({
      server: `./${globals.buildDir}`,
      notify: false,
      middleware: [historyApiFallback()],
      // ghostMode: {
      //   clicks: true,
      //   location: true,
      //   forms: true,
      //   scroll: false
      // }
    });
  }

  announceCompletion(result) {
    this.ui.writeSuccess(this.completionMessage);
    const err = errorFilter(result.stderr, this.showWarnings).join('\n');
    if (err) {
      this.ui.write(err);
    }
  }

  annouceFailure(result) {
    this.ui.writeError(this.errorMessage);
    const err = errorFilter(result.stderr, this.showWarnings).join('\n');
    if (err) {
      this.ui.write(err);
    }
    return Promise.reject(err);
  }

  writeProgress(result) {
    const _this = this;
    result.stdout.on('data', (data) => {
      if (_this.showFullLog) {
        _this.ui.write(data);
      } else {
        const err = errorFilter(data, this.showWarnings).join('\n');
        if (err) {
          _this.ui.writeError(err);
        }
      }
    });

    result.stderr.on('data', (data) => {
      const err = errorFilter(data, this.showWarnings).join('\n');
      if (err) {
        _this.ui.writeError(err);
      }
    });
  }
}

module.exports = RunTask;
