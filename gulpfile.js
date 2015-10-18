var gulp = require('gulp');
var minifyInline = require('gulp-minify-inline');
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify');
var minifyHtml = require('gulp-minify-html');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');

gulp.task('minify-html', function() {
  var opts = {
    conditionals: true,
    spare:true
  };

  return gulp.src('index.html')
    .pipe(minifyHTML(opts))
    .pipe(gulp.dest('build/'));
});

gulp.task('minify-inline', function() {
  gulp.src('index.html')
    .pipe(minifyInline())
    .pipe(gulp.dest('temporary/'));
});

gulp.task('usemin', function() {
  return gulp.src('temporary/index.html')
    .pipe(usemin({
      css: [ rev ],
      html: [ function () {return minifyHtml({ empty: true });} ],
      js: [ uglify, rev ],
      inlinejs: [ uglify ],
      inlinecss: [ minifyCss, 'concat' ]
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('minify-inline-p', function() {
  gulp.src('views/pizza.html')
    .pipe(minifyInline())
    .pipe(gulp.dest('temporary/'));
});

gulp.task('usemin-p', function() {
  return gulp.src('temporary/pizza.html')
    .pipe(usemin({
      css: [ rev ],
      html: [ function () {return minifyHtml({ empty: true });} ],
      js: [ uglify, rev ],
      inlinejs: [ uglify ],
      inlinecss: [ minifyCss, 'concat' ]
    }))
    .pipe(gulp.dest('build/views/'));
});

gulp.task('js-portfolio', function() {
  gulp.src('js/perfmatters.js')
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', 'perfmatters-min.js']
    }))
    .pipe(gulp.dest('build/js/'));
});
gulp.task('js-pizza', function() {
  gulp.src('views/js/main.js')
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', 'main-min.js']
    }))
    .pipe(gulp.dest('build/views/js/'));
});


gulp.task('html-css-js', ['minify-inline', 'usemin', 'minify-inline-p', 'usemin-p', 'js-portfolio', 'js-pizza']);
