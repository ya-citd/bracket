var gulp = require('gulp'),
    prefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    cssmin = require('gulp-minify-css'),
    browserSync = require('browser-sync'),
    del = require('del');
    runSequence = require('run-sequence');
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        css: 'build/',
        js: 'build/',
        img: 'build/assets/'
    },
    src: {
        html: 'src/index.html',
        style: 'src/style.scss',
        js: 'src/**/*.js',
        img: 'src/assets/**/*.*'
    },
    watch: {
        html: 'src/index.html',
        style: 'src/style.scss',
        js: 'src/**/*.js',
        img: 'src/assets/**/*.*'
    }
};

var config = {
    server: {
        baseDir: './build'
    },
    host: 'localhost',
    port: 5000,
    notify: false
};

gulp.task('webserver', function () {
    browserSync(config);
});

gulp.task('clean', function() {
    return del.sync('build/**/*');
});

gulp.task('html:build', function () {
    gulp.src(path.src.html)
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({stream: true}));
});

gulp.task('style:build', function () {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(prefixer())
        .pipe(cssmin())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({stream: true}));
});

gulp.task('js:build', function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({stream: true}));
});

gulp.task('image:build', function () {
    gulp.src(path.src.img)
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({stream: true}));
});

gulp.task('build', [
    'clean',
    'html:build',
    'style:build',
    'js:build',
    'image:build'
]);

gulp.task('watch', function() {
    gulp.watch(path.watch.html, ['html:build']);
    gulp.watch(path.watch.style, ['style:build']);
    gulp.watch(path.watch.js, ['js:build']);
    gulp.watch(path.watch.img, ['image:build']);
});

gulp.task('default', ['build']);
gulp.task('dev', function(callback) {
    runSequence (
        'build',
        'watch',
        'webserver',
        callback
    );
});
