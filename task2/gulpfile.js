var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var processors = [autoprefixer];
var plumber = require('gulp-plumber');
var paths = {
  sass: ['./css/*.scss']
};


gulp.task('default', ['sass']);

gulp.task('sass', function(done) {
  gulp.src('./css/style.scss')
  .pipe(plumber())
    .pipe(sass())
    .on('error', sass.logError)
    .pipe(gulp.dest('./css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./css/'))
    .on('end', done);
});


gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);
});


