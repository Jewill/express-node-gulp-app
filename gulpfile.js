const gulp = require('gulp'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    clean = require('gulp-clean'),
    runsenquence = require('gulp-run-sequence'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    source = require('vinyl-source-stream'),
    browserify = require('gulp-browserify')


const jsFromDir = [
        './bin/start-server',
        './develop/app.js',
        './develop/*.js',
        './develop/**/**/*.js',
        './develop/**/**/**/*.js'
    ],
    fontendDir = [
        './develop/frontend/*.*',
        './develop/frontend/**/*.*',
        './develop/frontend/**/**/*.*',
    ],
    resourcesDir = [
        './develop/public/*.*',
        './develop/public/**/*.*',
        './develop/public/**/**/*.*'
    ],
    watchDir = [
        './develop/app.js',
        './develop/backend/*.*',
        './develop/backend/**/*.*',
        './develop/backend/**/**/*.*',
        './develop/frontend/*.*',
        './develop/frontend/**/*.*',
        './develop/frontend/**/**/*.*',
        './develop/public/*.*',
        './develop/public/**/*.*',
        './develop/public/**/**/*.*'
    ]


gulp.task('clean', () => {
    return gulp.src('./www')
        .pipe(clean());
});

gulp.task('build-js', () => {
    return gulp.src(jsFromDir)
        .pipe(babel({
            presets: ['env', 'es2015']
        }))
        .pipe(gulp.dest('www'));
});

gulp.task('build-js-uglify', () => {
    return gulp.src(jsFromDir)
        .pipe(babel({
            presets: ['env', 'es2015']
        }))
        // .pipe(uglify())
        .pipe(gulp.dest('www'));
});

gulp.task('copy-frontend', () => {
    return gulp.src(fontendDir)
        .pipe(gulp.dest('www/frontend'));
});

gulp.task('copy-resources', () => {
    return gulp.src(resourcesDir)
        .pipe(gulp.dest('www/public'));
});

gulp.task('build-dev', () => {
    runsenquence('clean', 'build-js', 'copy-frontend', 'copy-resources');
});

gulp.task('build-prod', () => {
    runsenquence('clean', 'build-js-uglify', 'copy-frontend', 'copy-resources');
});

gulp.task('watch', () => {
    gulp.watch(watchDir, function (event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        runsenquence('clean', 'build-js', 'copy-frontend', 'copy-resources');
    });
});
