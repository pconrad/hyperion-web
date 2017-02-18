'use strict';

var del = require('del');
var gulp = require('gulp');
var path = require('path');

// Gulp plugins
var browserify = require('browserify');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var historyApiFallback = require('connect-history-api-fallback');
var imagemin = require('gulp-imagemin');
var jest = require('gulp-jest').default;
var less = require('gulp-less');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var size = require('gulp-size');
var stripDebug = require('gulp-strip-debug');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var useref = require('gulp-useref');
var util = require('gulp-util');
var watchify = require('watchify');

// Constants
var sourceFile = './app/scripts/index.tsx';
var destFolder = './dist/scripts';
var destFileName = 'app.js';

var bundler = watchify(browserify({
    cache: {},
    debug: true,
    entries: [ sourceFile ],
    fullPaths: true,
    insertGlobals: true,
    packageCache: {},
    plugin: [ tsify ]
}));

function rebundle() {
    return bundler.bundle()
        // log errors if they happen
        .on('error', util.log.bind(util, 'Browserify error'))
        .pipe(source(destFileName))
        .pipe(gulp.dest(destFolder))
        .on('end', function() {
            reload();
        });
}

bundler.on('update', rebundle);
bundler.on('log', util.log);

// Gulp tasks
gulp.task('scripts', rebundle);

gulp.task('buildScripts', function() {
    return browserify(sourceFile)
        .plugin(tsify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('html', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'))
        .pipe(size());
});

gulp.task('images', function() {
    return gulp.src('app/images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
        .pipe(size());
});

gulp.task('less', function () {
  return gulp.src('./app/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('clean', function() {
    cache.clearAll();
    return del.sync([ 'dist/styles', 'dist/scripts', 'dist/images' ]);
});

gulp.task('jest', function () {
    return gulp.src('app/**/__tests__').pipe(jest({
        config: require('./jest-config.json')
    }));
});

gulp.task('bundle', ['less', 'scripts'], function() {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

// Robots.txt and favicon.ico
gulp.task('extras', function() {
    return gulp.src(['app/*.txt', 'app/*.ico'])
        .pipe(gulp.dest('dist/'))
        .pipe(size());
});

gulp.task('watch', ['clean', 'html', 'bundle'], function() {
    browserSync({
        notify: false,
        logPrefix: 'BS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        middleware: [ historyApiFallback() ],
        server: ['dist', 'app']
    });

    // Watch .json files
    gulp.watch('app/scripts/**/*.json', ['json']);

    // Watch .html files
    gulp.watch('app/*.html', ['html']);

    gulp.watch(['app/styles/**/*.less', 'app/styles/**/*.less'], ['less', 'scripts', reload]);

    // Watch image files
    gulp.watch('app/images/**/*', reload);
});

gulp.task('build', ['html', 'buildBundle', 'images', 'extras'], function() {
    gulp.src(destFileName)
        .pipe(uglify())
        .pipe(stripDebug())
        .pipe(gulp.dest(destFolder));
});

gulp.task('buildBundle', ['less', 'buildScripts'], function() {
    return gulp.src('./app/*.html')
        .pipe(useref())
        .pipe(gulp.dest('dist'));
});

gulp.task('test', ['jest']);

// Default task
gulp.task('default', ['clean', 'build', 'test' ]);