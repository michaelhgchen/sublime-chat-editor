var
  gulp        = require('gulp'),
  plumber     = require('gulp-plumber'),
  runSequence = require('run-sequence'),

  // clean
  del = require('del'),

  // build scripts
  browserify   = require('browserify'),
  watchify     = require('watchify'),
  source       = require('vinyl-source-stream'),

  // build styles
  sass         = require('gulp-sass'),
  autoprefixer = require('gulp-autoprefixer'),

  // qa
  jshint = require('gulp-jshint'),
  mocha  = require('gulp-mocha'),

  // server
  fork = require('child_process').fork;

// ============================================================================
// Functions
// ============================================================================
function handleError(task) {
  return function(err) {
    console.error(task, err.message);
    this.emit('end');
  }
}

function logTime(task, fn) {
  return function() {
    var start;

    start = process.hrtime();

    gulp.emit('task_start', {
      task: task
    });

    fn();

    gulp.emit('task_stop', {
      hrDuration: process.hrtime(start),
      task: task
    });
  }
}

function buildScripts(config, watch) {
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
    stream.on('error', handleError('build-scripts'));
    stream = stream.pipe(source(config.output));

    return stream.pipe(gulp.dest(config.dest));
  };

  bundler.on('update', logTime('build-scripts', rebundle.bind(this)));

  return rebundle();
}

function buildStyles(config) {
  return gulp.src(config.src)
    .pipe(plumber())
    .pipe(sass())
      .on('error', handleError('build-styles'))
    .pipe(autoprefixer())
    .pipe(gulp.dest(config.dest));
}
// ============================================================================
// Tasks
// ============================================================================
// ====================================
// Clean
// ====================================
gulp.task('clean', function(cb) {
  del('./public/build/', cb);
});

// ====================================
// Build
// ====================================
gulp.task('build:scripts', function() {
  return buildScripts({
    src: './public/src/js/app.js',
    dest: './public/build/js/',
    output: 'scripts.js',
    transform: 'reactify'
  });
});

gulp.task('build:styles', function() {
  return buildStyles({
    src: './public/src/sass/styles.scss',
    dest: './public/build/css/'
  });
});

gulp.task('build', function(cb) {
  runSequence('clean', ['build:scripts', 'build:styles'], cb);
});

// ====================================
// Server
// ====================================
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
// Test
// ====================================
gulp.task('lint', function() {

});

gulp.task('test', function() {

});

// ====================================
// Watch
// ====================================
gulp.task('watch', function() {
  buildScripts({
    src: './public/src/js/app.js',
    dest: './public/build/js/',
    output: 'scripts.js',
    transform: 'reactify',
  }, true);

  gulp.watch('./public/src/sass/**/*.scss', ['build:styles']);
});

// ====================================
// Default
// ====================================
gulp.task('default', function() {
  runSequence(['server:start', 'build'], 'watch');
});