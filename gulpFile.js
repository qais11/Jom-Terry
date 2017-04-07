const gulp = require("gulp")
const pump = require('pump');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('./public/js/**/**.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/dist'));
});
