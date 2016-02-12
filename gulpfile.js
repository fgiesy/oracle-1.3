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
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    compass = require('gulp-compass');


//Runs our default gulp tasks (watches, lints and minifies the JS, SCSS and CSS).
gulp.task('default', function() {
  gulp.watch('js/scripts/*.js', ['build-js']);
  gulp.watch('scss/**/*.scss', ['compass']);
  gulp.watch('css/oracle.css', ['nano']);
});

gulp.task('compass', function() {
  gulp.src('scss/**/*.scss')
    //Error handling to throw Notification on error.
    .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
    //Use compass to compile the CSS.
    .pipe(compass({
      config_file: './config.rb',
      css: 'css',
      sass: 'scss'
    }))
    //Concatenate all files into one CSS file.
    .pipe(concat('oracle.css'))
});

//Autoprefixes, nanofies.
gulp.task('nano', function () {
  return gulp.src('css/oracle.css')
  //Autoprefix using "CanIuse?".
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('./css/'))
    //Nanofy it down into a minified version and rename.
    .pipe(cssnano())
    //Rename to min and pipe to the proper folder.
    .pipe(rename('oracle.min.css'))
    .pipe(gulp.dest('./css/'));
});

// Lint the SCSS using rules in .scss-lint.yml.
gulp.task('scss-lint', function() {
  return gulp.src('scss/**/*.scss')
    .pipe( scssLint({ customReport: scssLintStylish }) );
});

// Concatenate and uglify the JS.
gulp.task('build-js', function(){
  return gulp.src('js/scripts/*.js')
    //Error handling to not stop the task on Error.
    .pipe(plumber())
    //Lints and reports issues using stylish.
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    //Concatenates all scripts into main js.
    .pipe(concat('oracle.js'))
    .pipe(gulp.dest('js'))
    //Minifies main js file and uglifies it.
    .pipe(rename('oracle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});
