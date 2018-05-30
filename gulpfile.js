const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const fileinclude = require('gulp-file-include');
const cssnano = require('gulp-cssnano')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const babel = require('gulp-babel');

gulp.task('sass', () => {
  return gulp.src("src/style/magic.scss")
    .pipe(sass({
      errLogToConsole: true
    }))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest('dist/style'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/style'))
    .pipe(browserSync.stream());
});

gulp.task('scripts', () => {
  return gulp.src('src/script/script.js')
    .pipe(babel())
    .pipe(gulp.dest('dist/script'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('dist/script'))
    .pipe(browserSync.stream());
});

gulp.task('template', () => {
  return gulp.src('src/*.html')
    .pipe(fileinclude())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream())
});

gulp.task('serve', ['sass', 'template', 'scripts'], () => {
  browserSync.init({
    server: "dist"
  });
  gulp.watch("src/style/**/*.scss", ['sass']);
  gulp.watch("src/**/*.html", ['template']);
  gulp.watch("src/script/script.js", ['scripts']);
});

gulp.task('default', ['sass', 'template', 'scripts'])
