var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var clean = require('gulp-clean');

var paths = {
    scripts: [ 'app/**/*.js', '!app/bower_components/**/*.js' ],
    html: [
      './app/**/*.html',
      '!./app/index.html',
      '!./app/bower_components/**/*.html'
    ],
    index: './app/index.html',
    build: './build/',
    styles: {
        src: './app/assets/styles',
        files: './app/assets/styles/*.scss',
        dest: './app/assets/styles/'
    }
};

gulp.task('serve', ['sass'], function() {

  browserSync.init({
    server: './app'
  });

  gulp.watch(paths.styles.files, ['sass']);
  // gulp.watch(paths.scripts, ['jshint']);
  gulp.watch(['./app/*.html', './app/**/*.js']).on('change', browserSync.reload);

});

gulp.task('jshint', function(){
  return gulp.src(paths.scripts)
      .pipe(jshint('.jshintrc'))
      .pipe(jshint.reporter(stylish))
      .pipe(jshint.reporter('fail').on('error', function(err){
        gutil.beep();
        gutil.log(err.message);
      }));
});

gulp.task('sass', function() {
  return gulp.src(paths.styles.files)
      .pipe(sass())
      .pipe(prefix('last 2 version'))
      .pipe(gulp.dest(paths.styles.src))
      .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);
