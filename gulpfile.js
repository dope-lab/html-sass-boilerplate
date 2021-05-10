'use strict';


const gulp = require('gulp'),
	sass = require('gulp-sass'),
	clean = require('gulp-clean'),
	watch = require('gulp-watch'),
	sourcemaps = require('gulp-sourcemaps'),
	autoprefixer = require("autoprefixer"),
	postcss = require('gulp-postcss'),
	pxtorem = require('postcss-pxtorem'),
	concat = require('gulp-concat'),
	sassvg = require('gulp-sassvg'),
	cleanCSS = require('gulp-clean-css'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename');



//set the input & output variables

const input = {
  sass: './assets/src/scss/**/*.scss',
  customjs: './assets/src/js/*.js',
  svg: './assets/src/svg/**/*.svg'

}

const output = {
  dist: './assets/dist/*',
  css: './assets/dist/css',
  customjs: './assets/dist/js/',
  sassvg: './assets/src/sassvg'

}

function cleanDist() {
	return gulp
	.src(output.dist, {read: false})
    .pipe(clean());
}

function css2sass() {
  return gulp
    .src(input.sass)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(postcss([pxtorem(), autoprefixer()]))
    .pipe(gulp.dest(output.css));
}



function customJs() {
	return gulp
	  .src([
      'assets/src/js/core.js',
      input.customjs])
	  .pipe(sourcemaps.init())
      .pipe(concat('core.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(output.customjs));
}

function inlinesvg() {
	return gulp
	  .src(input.svg)
	  .pipe(sassvg({
      outputFolder: output.sassvg,
        optimizeSvg: true
    }));
}

function minifyCss() {
	return gulp
    .src(output.css + '/core.css')
    .pipe(cleanCSS({compatibility: 'ie10'}))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(output.css));
}

function minifyCustomJs() {
	return gulp
    .src(output.customjs + '/core.js')
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(output.customjs));
}

function watchFiles() {
	gulp.watch(input.sass, gulp.series('css2sass'));
	gulp.watch(input.customjs, gulp.series('customJs'));
	gulp.watch(input.svg, gulp.series('inlinesvg'));
}


const build = gulp.series(cleanDist, css2sass, customJs, inlinesvg);
const watchAgain = gulp.parallel(watchFiles);
const buildProd = gulp.series(build, minifyCss, minifyCustomJs);

exports.clean = cleanDist;
exports.css2sass = css2sass;
exports.customJs = customJs;
exports.inlinesvg = inlinesvg;
exports.watch = watchAgain;
exports.buildProd = buildProd;
exports.default = build;
