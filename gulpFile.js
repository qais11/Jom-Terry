const gulp = require("gulp")
// const uglify = require('gulp-uglify');
const pump = require('pump');
const babel = require('gulp-babel');

gulp.task('default', () => {
    return gulp.src('./public/js/**/**.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./public/dist'));
});


// gulp.task('compress', function (cb) {
//   pump([
//         gulp.src('./public/js/**/**.js'),
//         uglify(),
//         gulp.dest('./public/dist')
//     ],
//     cb
//   );
// });
