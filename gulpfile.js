var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var prefix = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var clean = require('gulp-clean');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');

var paths = {
  scripts: ['app/**/*.js', '!app/bower_components/**/*.js'],
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

gulp.task('jshint', function() {
  return gulp.src(paths.scripts)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter(stylish))
    .pipe(jshint.reporter('fail').on('error', function(err) {
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

gulp.task('usemin', function() {
  return gulp.src(paths.index)
    .pipe(usemin({
      css: [minifyCss(), 'concat'],
      html: [minifyHtml({
        empty: true
      })],
      js: [uglify()]
    }))
    .pipe(gulp.dest(paths.build));
});

gulp.task('copy', ['clean', 'fonts'], function() {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.build));
});

gulp.task('clean', function() {
  gulp.src(paths.build, {
      read: false
    })
    .pipe(clean());
});

// Fonts
gulp.task('fonts', function() {
  return gulp.src([
      'app/bower_components/font-awesome/fonts/fontawesome-webfont.*'
    ])
    .pipe(gulp.dest(paths.build + '/assets/fonts/'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['copy', 'jshint', 'sass', 'usemin']);
