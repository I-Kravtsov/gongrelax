'use strict'
let gulp = require('gulp');
let browserSync = require('browser-sync');
let less = require('gulp-less');
let autoPrefixer = require('autoprefixer');
let postcss = require('gulp-postcss');
let minify = require('gulp-minify');

gulp.task('less', function(){
    return gulp.src('./src/less/style.less')
            .pipe(less())
            .pipe(gulp.dest('./src/css'))
            .pipe(browserSync.reload({stream: true}))
});

gulp.task('autoPrefixer', function() {
    return gulp.src('./src/css/*.css')
            .pipe(postcss([autoPrefixer({
                overrideBrowserslist: ['last 2 version'],
                cascade: false,
            })]))
            .pipe(gulp.dest('./build/css/'))
            .pipe(browserSync.reload({stream: true}))
});
 
gulp.task('compress', function() {
  gulp.src('./src/js/*.js')
    .pipe(minify())
    .pipe(gulp.dest('./build/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('imageCopy', function(){
    gulp.src('./src/img/**/*.*')
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('fontsCopy', function(){
    gulp.src('./src/fonts/**/*.*')
        .pipe(gulp.dest('./build/fonts'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('htmlCopy', function(){
    gulp.src('./src/**/*.html')
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: './build',
        notify: false
    })
});

gulp.task('watch', function(){
    gulp.watch('./src/**/*.less').on('change', gulp.parallel ('less'));
    gulp.watch('./src/css/**/*.css').on('change', gulp.parallel ('autoPrefixer'));
    gulp.watch('./src/img/**/*.*').on('change', gulp.parallel ('imageCopy'));
    gulp.watch('./src/fonts/**/*.*').on('change', gulp.parallel ('fontsCopy'));
    gulp.watch('./src/**/*.html').on('change', gulp.parallel ('htmlCopy'));
    gulp.watch('./src/**/*.js').on('change', gulp.parallel ('compress'));
    gulp.watch('./build/*.html').on('change', browserSync.reload);
});


gulp.task('default', gulp.parallel('less', 'compress', 'autoPrefixer', 'browser-sync', 'watch'));