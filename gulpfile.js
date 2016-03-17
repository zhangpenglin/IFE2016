var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var processors = [autoprefixer];
var plumber = require('gulp-plumber');



gulp.task('default', function() {
	for (var i = 2; i < 13; i++) {
		gulp.src('./task1/**')
			.pipe(plumber())
			.pipe(gulp.dest('./task' + i))
	}
})