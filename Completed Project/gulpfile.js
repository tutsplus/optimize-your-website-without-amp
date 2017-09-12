var gulp = require('gulp');
var browserSync = require('browser-sync').create();

var concatCss = require('gulp-concat-css');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pug = require('gulp-pug');
var rename = require('gulp-rename');

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    },
    open: false
  });
});

gulp.task('css', function () {
  gulp.src('src/css/style.css')
    .pipe(concatCss("src/css/style.css"))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('src/css'))
});

gulp.task('noscript_css', function () {
  gulp.src('src/css/noscript.css')
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(rename('noscript.min.css'))
    .pipe(gulp.dest('src/css'))
});

gulp.task('html', function() {
  return gulp.src( 'src/html/index.pug' )
    .pipe( pug() )
    .pipe( gulp.dest('./') )
    .pipe( browserSync.stream() )
});

gulp.task('js', function() {
  gulp.src([
    'node_modules/lazysizes/lazysizes.min.js',
    'node_modules/baguettebox.js/dist/baguetteBox.min.js',
    'node_modules/siema/dist/siema.min.js'
  ])
  .pipe( concat('index.min.js') )
  .pipe(uglify())
  .pipe(gulp.dest('./'))
  .pipe( browserSync.stream() )
});

gulp.task('default', ['browser-sync'], function () {
	gulp.watch('./src/css/style.css', ['css']);
	gulp.watch('./src/css/noscript.css', ['noscript_css']);
	gulp.watch(['./src/html/**', './src/css/style.min.css', './src/css/noscript.min.css'], ['html']);
});