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
var destFolder = './dist/scripts';
var destFileName = 'app.js';

var b = browserify({
        cache: {},
        debug: true,
        entries: [ sourceFile ],
        fullPaths: true,
        insertGlobals: false,
        packageCache: {}
    })
// Awaits https://github.com/timothykang/tslintify/pull/1
//    .plugin(tslintify, { format: 'stylish', warn: true })
    .plugin(tsify)
    .plugin(watchify)
    .on('warning', function(warning) {
        console.warn(warning);
    })
;

function bundle() {
    b.bundle()
        .pipe(source(destFileName))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destFolder))
        .on('warning', function(warning) {
            console.warn(warning);
        })
        .on('error', function(error) {
            console.error(error);
        })
        .on('end', function () {
            reload();
        });
}

b.on('update', bundle);
b.on('log', util.log);

// Gulp tasks
gulp.task('scripts', bundle);

gulp.task('buildScripts', function() {
    return b.bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest(destFolder));
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
    return gulp.src('.').pipe(jest({
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

function determineApiHost() {
    var apiHost = process.env.API_HOST || defaultApiHost
    if (apiHost === defaultApiHost) {
        console.warn('Redirecting API calls to ' + apiHost + '; start with API_HOST=... to override');
    } else {
        console.info('Redirecting API calls to ' + apiHost);
    }
    return apiHost;
}

gulp.task('watch', ['clean', 'html', 'bundle'], function() {
    var proxyOptions = url.parse(determineApiHost() + '/api');
    proxyOptions.route = '/api';

    browserSync({
        notify: false,
        logPrefix: 'BS',
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        middleware: [ proxy(proxyOptions), historyApiFallback() ],
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
    var src = path.join(destFolder, destFileName);
    gulp.src(src)
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