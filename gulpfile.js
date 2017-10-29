const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');

// compile sass
gulp.task('sass', function () {
  // our source are bootstrap file and our .scss files
  return gulp.src([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ])
  .pipe(sass()) // to converto sass files to css files
  .pipe(gulp.dest('src/css')) // to put converted file in src/css
  .pipe(browserSync.stream());
});

gulp.task('js', function () {
  return gulp.src([
    'node_modules/jquery/dist/jquery.min.js',
    'node_modules/popper.js/dist/umd/popper.min.js',
    'node_modules/bootstrap/dist/js/bootstrap.min.js'
    // 'tether/dist/js/tether.min.js',
  ])
  .pipe(gulp.dest('src/js'))
  .pipe(browserSync.stream());
});

gulp.task('serve', ['sass'], function () {
  browserSync.init({
    server: './src'
  });

  gulp.watch([
    'node_modules/bootstrap/scss/bootstrap.scss',
    'src/scss/*.scss'
  ], ['sass']);

  gulp.watch('src/*.html').on('change', browserSync.reload);
});

// move fonts folder to src folder
gulp.task('fonts', function () {
  return gulp.src('node_modules/font-awesome/fonts/*')
    .pipe(gulp.dest('src/fonts'));
});

// move fonts css folder to src folder
gulp.task('fa', function () {
  return gulp.src('node_modules/font-awesome/css/font-awesome.min.css')
  .pipe(gulp.dest('src/css'));
});

// execute tasks with gulp command
gulp.task('default', ['js', 'serve', 'fa', 'fonts'])
