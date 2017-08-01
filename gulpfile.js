'use strict';

var del = require('del');
var gulp = require('gulp');
var path = require('path');

// Gulp plugins
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var browserSync = require('browser-sync');
var cache = require('gulp-cache');
var historyApiFallback = require('connect-history-api-fallback');
var imagemin = require('gulp-imagemin');
var jest = require('gulp-jest').default;
var less = require('gulp-less');
var proxy = require('proxy-middleware');
var reload = browserSync.reload;
var source = require('vinyl-source-stream');
var size = require('gulp-size');
var sourcemaps = require('gulp-sourcemaps');
var stripDebug = require('gulp-strip-debug');
var tsify = require('tsify');
var uglify = require('gulp-uglify');
var url = require('url');
var useref = require('gulp-useref');
var util = require('gulp-util');
var transform = require('vinyl-transform');
var tslintify = require('tslintify');
var watchify = require('watchify');

// Constants
var sourceFile = './app/scripts/index.tsx';
var defaultApiHost = 'http://example.com/';
var destFileName = 'app.js';
var destFolder = './dist/scripts';

function handleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        message: '<%= error.message %>',
        title: 'Compile Error',
    }).apply(this, args);
    this.emit('end'); // Prevents Gulp from hanging on this task
}

function buildScript(file, watch) {
    var props = {
        cache: {},
        debug : true,
        entries: [ file ],
        packageCache: {},
        plugin: [ tsify ]
    };

    // watchify() if watch requested, otherwise run browserify() once 
    var bundler = watch ? watchify(browserify(props)) : browserify(props);
    
    function rebundle() {
        return bundler.bundle()
            .on('warning', console.warn)
            .on('end', browserSync.reload)
            .on('error', handleErrors)

            .pipe(source(destFileName))
            .pipe(buffer())
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(sourcemaps.write('.'))
            
            .pipe(gulp.dest(destFolder));
    }

    // listen for an update and run rebundle
    bundler.on('update', function() {
        util.log('Rebundling...');
        rebundle();
    });

    // run it once the first time we're called
    return rebundle();
}

function determineApiHost() {
    var apiHost = process.env.API_HOST || defaultApiHost
    if (apiHost === defaultApiHost) {
        console.warn('Redirecting API calls to ' + apiHost + '; start with API_HOST=... to override');
    } else {
        console.info('Redirecting API calls to ' + apiHost);
    }
    return apiHost;
}

// Intermediate tasks
gulp.task('clean', function () {
    del.sync([ destFolder, 'tslint.out' ]);
});
gulp.task('createBundle', ['buildScripts'], function () {
    return gulp.src('./*.html')
        .pipe(useref())
        .pipe(gulp.dest(destFolder));
});
gulp.task('extras', function() {
    return gulp.src(['app/*.txt', 'app/*.ico'])
        .pipe(gulp.dest('dist/'))
        .pipe(size());
});
gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulp.dest(destFolder))
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
gulp.task('jest', function () {
    return gulp.src('.').pipe(jest({
        config: require('./jest-config.json')
    }));
});
gulp.task('less', function () {
  return gulp.src('./app/less/**/*.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest('./dist/styles'));
});
gulp.task('minify', [ 'scripts' ], function() {
    return gulp.src(path.join(destFolder, destFileName))
        .pipe(stripDebug())
        .pipe(uglify())
        .pipe(gulp.dest(destFolder))
    ;
});
gulp.task('scripts', function() {
    return buildScript(sourceFile, false);
});
gulp.task('test', ['jest']);
gulp.task('watchify', function() {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    var proxyAPIOptions = url.parse(determineApiHost() + '/api');
    proxyAPIOptions.route = '/api';

    browserSync({
        notify: false,
        open: false,
        logPrefix: 'BS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        middleware: [proxy(proxyAPIOptions)],
        server: ['dist', '.']
    });

    return buildScript(sourceFile, true);
});

// End-user tasks
gulp.task('watch', ['clean', 'html', 'watchify']);
gulp.task('default', ['clean', 'html', 'minify']);