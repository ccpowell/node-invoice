var gulp = require("gulp");
var babel = require('gulp-babel');
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('clean-server', function (cb) {
    return del(['dist'], cb);
});

gulp.task("server-js", function () {
    return gulp.src("src/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist"));
});

gulp.task('server', function (cb) {
    runSequence('clean-server', 'server-js', cb);
});

gulp.task('default', ['server']);
