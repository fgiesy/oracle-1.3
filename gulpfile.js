'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    scssLint = require('gulp-scss-lint'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    jshintStylish = require('jshint-stylish'),
    scssLintStylish = require('gulp-scss-lint-stylish'),
    compass = require('gulp-compass');

gulp.task('default', function() {
  gulp.watch('js/**/*.js', ['jshint']);
  gulp.watch('js/**/*.js', ['build-js']);
  gulp.watch('scss/**/*.scss', ['compass']);
});


/*
// Compile Our Sass, Apply vendor prefixes, Minify.
gulp.task('sass', function() {
  //return gulp.src('scss/**///*.scss') //replace with the cleaned up version.
/*    .pipe(sass())
    .pipe(autoprefixer({
       browsers: ['last 3 versions'],
       cascade: false
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(concat('oracle.css'))
    .pipe(cssnano())
    .pipe(rename('oracle.min.css'))
    .pipe(gulp.dest('./css/'));
});
*/

gulp.task('compass', function() {
  gulp.src('scss/**/*.scss')
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss'
    }))
    .pipe(concat('oracle.css'))
    .pipe(cssnano())
    .pipe(rename('oracle.min.css'))
    .pipe(gulp.dest('./css/'));
});

gulp.task('scss-lint', function() {
  return gulp.src('scss/**/*.scss')
    .pipe( scssLint({ customReport: scssLintStylish }) );
});

// Lint and hint our JS.
gulp.task('jshint', function() {
  return gulp.src('js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// Concatenate and Uglify
gulp.task('build-js', function(){
  return gulp.src('js/**/*.js')
    .pipe(concat('oracle.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('oracle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});
