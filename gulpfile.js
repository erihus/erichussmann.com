// Load Gulp
var gulp        = require('gulp'),
    gutil       = require('gulp-util');
    browserify  = require('browserify');
    streamify   = require('gulp-streamify');
    source      = require('vinyl-source-stream');
    plugins     = require('gulp-load-plugins')();

// All Tasks: Run "gulp"
gulp.task('default', ['js-libs', 'scripts', 'styles']);

// Minify jQuery Plugins: Run manually with: "gulp js-lbs"
gulp.task('js-libs', function() {
  return gulp.src('assets/src/js/lib/**/*.js')
    .pipe(plugins.uglify())
    .pipe(plugins.concat('libs.min.js'))
    .pipe(gulp.dest('assets/dist/js'));
});


//Browserify, Uglify and Minify Custom JS: Run manually with: "gulp scripts"
gulp.task('scripts', function() {
  var bundleStream = browserify('assets/src/js/scripts.js').bundle()

  bundleStream
    .pipe(source('assets/src/js/scripts.js'))
    .pipe(streamify(plugins.uglify()))
    .pipe(plugins.rename('scripts.min.js'))
    .pipe(streamify(plugins.concat('scripts.min.js')))
    .pipe(gulp.dest('assets/dist/js'))
});

// Less to CSS: Run manually with: "gulp styles"
gulp.task('styles', function() {
    return gulp.src('assets/src/less/*.less')
        .pipe(plugins.plumber())
        .pipe(plugins.less())
        .on('error', function (err) {
            gutil.log(err);
            this.emit('end');
        })
        .pipe(plugins.autoprefixer(
            {
                browsers: [
                    '> 1%',
                    'last 2 versions',
                    'firefox >= 4',
                    'safari 7',
                    'safari 8',
                    'IE 8',
                    'IE 9',
                    'IE 10',
                    'IE 11'
                ],
                cascade: false
            }
        ))
        .pipe(plugins.cssmin())
        .pipe(gulp.dest('assets/dist/css')).on('error', gutil.log);
});


// Default task
gulp.task('watch', function() {
    gulp.watch('assets/src/js/lib/**/*.js', ['js-libs']);
    gulp.watch('assets/src/js/lib/**/**/*.js', ['js-libs']);
    gulp.watch('assets/src/js/*.js', ['scripts']);
    gulp.watch('assets/src/less/**/**/*.less', ['styles']);
});