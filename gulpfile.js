'use strict';

var gulp = require('gulp'),
    connect = require('gulp-connect'),
    sass = require('gulp-sass'),
    sassLint = require('gulp-sass-lint');


gulp.task('sass', function () {
    return gulp.src('./**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./**/*.scss', ['sass']);
});

gulp.task('connect', function() {
    connect.server({
        root: './',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./')
        .pipe(gulp.dest('./'))
        .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(['./*.html', './**/*.scss'], ['html','sass']);
});

gulp.task('default', ['connect', 'watch']);

gulp.task('sassLint', function () {
    return gulp.src('./**/*.s+(a|c)ss')
        .pipe(sassLint(
            {
                configFile: '.sass-lint.yml',
            }))
        .pipe(sassLint.format())
        .pipe(sassLint.failOnError())
});