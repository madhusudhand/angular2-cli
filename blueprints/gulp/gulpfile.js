var config      = require('./build.config.json');
var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var jade        = require('gulp-jade');

gulp.task('jade', function() {
  var YOUR_LOCALS = {};

  gulp.src('./src/*.jade')
    .pipe(jade({
      locals: YOUR_LOCALS
    }))
    .pipe(gulp.dest('./dist/'))
});

gulp.task('dev', []);
gulp.task('dist', []);
gulp.task('serve', ['browser-sync', 'watch']);
gulp.task('serve', function() {
    browserSync.init({
        server: './' + config.build_dir
    });

    // gulp.watch("app/scss/*.scss", ['sass']);
    // gulp.watch("app/*.html").on('change', browserSync.reload);
});
