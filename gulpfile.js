const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const cleancss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const inline = require('gulp-inline');

/* Clean destination folder */
gulp.task('clean', function() {
    del(['dist/*']);
    return true;
});

/* Copy static files */
gulp.task('files', function() {
    return gulp.src([
            'src/backgroung.png',
            'src/settings.js'
        ])
        .pipe(gulp.dest('dist/'));
});

/* Process HTML, CSS, JS  --- INLINE --- */
gulp.task('inline', function() {
    return gulp.src('src/*.html')
        .pipe(inline({
            base: 'src/',
            //js: uglify,
            css: cleancss,
            disabledTypes: ['svg', 'img'],
            ignore: ['./settings.js']
        }))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: false
        }))
        .pipe(gulp.dest('dist'));
})

/* Build file system */
gulp.task('buildfs', ['clean', 'files', 'inline']);
gulp.task('default', ['buildfs']);