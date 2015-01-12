// gulp dependencies
var gulp = require('gulp');
var plumber = require('gulp-plumber');
var changed = require('gulp-changed');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var jshint = require('gulp-jshint');
var mocha  = require('gulp-mocha');
var react = require('gulp-react');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
var source = require('vinyl-source-stream');

// node dependencies
var fork  = require('child_process').fork;

// other dependencies
var del = require('del');
var browserify = require('browserify');
var watchify = require('watchify');

// constants
var BUILD_PATH = './public/build/';
var JSX_DEST = './src/compiled-app/';
var BROWSERIFY_SRC = './src/js/ClientReactApp.js';
var BROWSERIFY_OUTPUT = 'scripts.js';
var SASS_SRC = './src/sass/styles.scss';
var CSS_SRC = './public/build/styles.css';
var JSX_SRC = ['./src/js/**/*.js'];
var SASS_ALL = './src/sass/**/*.scss';

// ============================================================================
// Functions
// ============================================================================
// handle task errors
function handleError(task) {
  return function(err) {
    console.error(task, err.message);
    this.emit('end');
  }
}

// log duration of tasks specifically for watchify
function logTime(task, fn) {
  return function() {
    var start = process.hrtime();

    gulp.emit('task_start', { task: task });
    fn();
    gulp.emit('task_stop', {
      hrDuration: process.hrtime(start),
      task: task
    });
  }
}

// browserify scripts with option to watchify
function browserifyScripts(config, watch) {
  var bundler, rebundle;

  bundler = browserify(config.src, {
    fullPaths: !!watch,
    cache: {},
    packageCache: {}
  });

  if(watch) bundler = watchify(bundler);

  bundler.transform(config.transform);

  rebundle = function() {
    var stream;

    stream = bundler.bundle();
    stream.on('error', handleError('browserifyScripts'));
    stream = stream.pipe(source(config.output));

    return stream.pipe(gulp.dest(config.dest));
  };

  bundler.on('update', logTime('browserifyScripts', rebundle.bind(this)));

  return rebundle();
}
// ============================================================================
// Tasks
// ============================================================================
// ====================================
// Clean
// ====================================
gulp.task('clean', function(cb) { del([BUILD_PATH, JSX_DEST], cb); });

// ====================================
// Build
// ====================================
// compile jsx
gulp.task('jsx', function() {
  return gulp.src(JSX_SRC)
    .pipe(changed(JSX_DEST))
    .pipe(react())
    .pipe(gulp.dest(JSX_DEST));
});

// reactify jsx for client-side use
gulp.task('reactify', function() {
  return browserifyScripts({
    src: BROWSERIFY_SRC,
    output: BROWSERIFY_OUTPUT,
    dest: BUILD_PATH,
    transform: 'reactify'
  });
});

// compile sass and auto-prefix css
gulp.task('sass', function() {
  return gulp.src(SASS_SRC)
    .pipe(plumber())
    .pipe(sass())
      .on('error', handleError('build-styles'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(BUILD_PATH));
});

// clean then build everything
gulp.task('build', function(cb) {
  runSequence('clean', ['sass', 'reactify', 'jsx'], cb);
});

// ====================================
// Server
// ====================================
// start a server
(function(){
  var server;

  gulp.task('server:start', function() {
    if(!server) {
      server = fork('app');

      process.on('exit', function() {
        server.kill();
      });
    }
  });

  gulp.task('server:stop', function() {
    server && server.kill();
  });
}());

// ====================================
// Optimize
// ====================================
// optimize client-side js
gulp.task('uglify', function() {
  return gulp.src(BUILD_PATH + BROWSERIFY_OUTPUT)
    .pipe(uglify())
    .pipe(gulp.dest(BUILD_PATH));
});

// optimize css
gulp.task('minifycss', function() {
  return gulp.src(CSS_SRC)
    .pipe(minifyCss({compatibility:'ie8'}))
    .pipe(gulp.dest(BUILD_PATH));
});

gulp.task('optimize', ['uglify', 'minifycss']);

// ====================================
// Watch
// ====================================
// compile jsx for client and server-side, build css
gulp.task('watch', function() {
  browserifyScripts({
    src: BROWSERIFY_SRC,
    output: BROWSERIFY_OUTPUT,
    dest: BUILD_PATH,
    transform: 'reactify'
  }, true);

  gulp.watch(JSX_SRC, ['jsx']);
  gulp.watch(SASS_ALL, ['sass']);
});

// ====================================
// Default
// ====================================
// build, watch then start server
gulp.task('default', function() {
  runSequence('build', 'watch', 'server:start');
});