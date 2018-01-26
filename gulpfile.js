var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var fileinclude = require('gulp-file-include');

gulp.task('sass', function() {
  return gulp.src(["src/style/**/*.scss","src/style/**/*.css"])
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer({
      browsers: ['last 2 versions']
    })]))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
  return gulp.src('src/scripts/**/*.js')
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.stream());
});

gulp.task('template', function() {
  return gulp.src('src/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream());
});

gulp.task('serve', ['sass', 'template','scripts'], function() {
  browserSync.init({
    server: "dist"
  });
  gulp.watch("src/style/**/*.scss", ['sass']);
  gulp.watch("src/**/*.html", ['template']);
  gulp.watch("src/scripts/**/*.js", ['scripts']);
});

gulp.task('default', ['sass', 'template','scripts'])
