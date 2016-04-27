var config      = require('./build.config.json');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jade        = require('gulp-jade');
var sass        = require('gulp-sass');
var csso        = require('gulp-csso');
var ts          = require('gulp-typescript');
var newer       = require('gulp-newer');
var watch       = require('gulp-watch');

gulp.task('jade:dev', function() {
  gulp.src(config.app_files.jade, {base: config.app_dir + '/'})
    .pipe(newer('./' + config.build_dir))
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest(config.build_dir));
});

gulp.task('jade:dist', function() {
  gulp.src(config.app_files.jade, {cwd: config.app_dir + '/'})
    .pipe(jade({
      pretty: false
    }))
    .pipe(gulp.dest('./' + config.build_dir))
});

gulp.task('sass:dev', function () {
  gulp.src(config.app_files.sass, {cwd: config.app_dir + '/'})
    // .pipe(concat(config.app_files.css_file + '.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./' + config.build_dir));
});

gulp.task('sass:dist', function () {
  gulp.src(config.app_files.sass, {base: config.app_dir + '/'})
    // .pipe(concat(config.app_files.css_file + '.min.css'))
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./' + config.build_dir));
});

var tsProject = ts.createProject('./src/tsconfig.json');

gulp.task('ts', function () {
  tsProject.src()
    // .pipe(sourcemaps.init())
    .pipe(ts(tsProject))
    // .pipe(sourcemaps.write());
    .js
    .pipe(gulp.dest('dist'));
});



gulp.task('dev', ['jade:dev', 'sass:dev', 'ts']);
gulp.task('dist', ['jade:dist', 'sass:dist', 'ts']);
gulp.task('serve', ['browser-sync', 'watch']);
gulp.task('serve', function() {
  browserSync.init({
    server: './' + config.build_dir,
    notify: false,
    ghostMode: {
      clicks: true,
      location: true,
      forms: true,
      scroll: false
    }
  });

  gulp.watch([config.app_dir + '/*.jade', config.app_dir + '/**/*.jade'], ['jade:dev']);
  gulp.watch([config.app_dir + '/*.scss', config.app_dir + '/**/*.scss'], ['sass:dev']);
  gulp.watch([config.app_dir + '/*.ts', config.app_dir + '/**/*.ts'], ['ts']);

  gulp.on('stop', browserSync.reload);
});
