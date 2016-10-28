// required module
var gulp        = require('gulp');
var jshint      = require('gulp-jshint');
var changed     = require('gulp-changed');
var plumber     = require('gulp-plumber');
var cleanCSS    = require('gulp-clean-css');
var sass        = require('gulp-sass');
var uglify      = require('gulp-uglify');
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
var concat      = require('gulp-concat');

// task jshint
gulp.task('linter', function() {
    return gulp.src('./js/*.js')
    .pipe(plumber())
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// task concat
gulp.task('concat', function() {
    return gulp.src(['./js/jquery-2.1.3.min.js', './js/functions.js'])
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./js/min'));
});

// task uglify
gulp.task('compress', ['concat'], function() {
    return gulp.src('./js/all.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js/min'));
});

// task minify css
gulp.task('minify-css', function() {
    return gulp.src('./css/*.css')
    .pipe(cleanCSS({ keepBreaks: true }))
    .pipe(gulp.dest('./css/min'));
});

// task sass
gulp.task('sass', function() {
    return gulp.src('./sass/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('css'));
});

// task serve browser sync
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: './'
    });

    gulp.watch('./sass/*.scss', ['sass']);
    gulp.watch('./css/*.css', ['minify-css']);
    gulp.watch('./js/*.js', ['concat']);
    gulp.watch('./*.html').on('change', reload);
    gulp.watch('./css/min/*.css').on('change', reload);
    gulp.watch('./js/min/*.js').on('change', reload);
});

// task default
gulp.task('default', ['serve']);
