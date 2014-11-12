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
  fork  = require('child_process').fork,
  react = require('gulp-react'),

  // optimize
  minifyCss = require('gulp-minify-css'),
  uglify    = require('gulp-uglify');

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

// browserify + reactify, with option to watchify
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

// compile sass and auto-prefix resulting css
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
// compile jsx for server-side use
gulp.task('build:scripts:server', function() {
  return gulp.src('./public/src/js/**/*.js')
    .pipe(react())
    .pipe(gulp.dest('server-react'));
});

// browserify + reactify jsx for client-side use
gulp.task('build:scripts', function() {
  return buildScripts({
    src: './public/src/js/app.js',
    dest: './public/build/js/',
    output: 'scripts.js',
    transform: 'reactify'
  });
});

// compile sass and auto-prefix resulting css
gulp.task('build:styles', function() {
  return buildStyles({
    src: './public/src/sass/styles.scss',
    dest: './public/build/css/'
  });
});

// clean built then build everything again
gulp.task('build', function(cb) {
  runSequence('clean', ['build:scripts', 'build:scripts:server', 'build:styles'], cb);
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
// Test
// ====================================
gulp.task('lint', function() {});
gulp.task('test', function() {});

// ====================================
// Optimize
// ====================================
// optimize client-side js
gulp.task('uglify', function() {
  return gulp.src('./public/build/js/scripts.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/build/js/'));
});

// optimize css
gulp.task('minify-css', function() {
  return gulp.src('./public/build/css/styles.css')
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/build/css/'));
});

gulp.task('optimize', ['uglify', 'minify-css']);

// ====================================
// Watch
// ====================================
// compile jsx for client and server-side, build css
gulp.task('watch', function() {
  buildScripts({
    src: './public/src/js/app.js',
    dest: './public/build/js/',
    output: 'scripts.js',
    transform: 'reactify',
  }, true);

  gulp.watch('./public/build/js/**/*.js', ['build:scripts:server']);

  gulp.watch('./public/src/sass/**/*.scss', ['build:styles']);
});

// ====================================
// Default
// ====================================
// build, watch then start server
gulp.task('default', function() {
  runSequence('build', 'watch', 'server:start');
});