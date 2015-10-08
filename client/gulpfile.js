/**
 * Created by chris_000 on 9/12/2015.
 */
var gulp = require("gulp");
var stylus = require("gulp-stylus");
var del = require('del');
var runSequence = require('run-sequence');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task("client-js", function () {
    return browserify({entries: './src/app.js', extensions: ['.js'], debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest("dist"));
});

gulp.task("client-styl", function () {
    return gulp.src("css/**/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("dist"));
});

gulp.task("client-css", function () {
    return gulp.src("css/**/*.css")
        .pipe(gulp.dest("dist"));
});

gulp.task("client-html", function () {
    return gulp.src("src/index.html")
        .pipe(gulp.dest("dist"));
});

gulp.task("client", [], function (cb) {
    runSequence('clean', ['client-js', 'client-css', 'client-styl', 'client-html'], cb);
});

gulp.task("default", ['client']);
