var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');

// compile sass into CSS and auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'])
        .pipe(sass())
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});


// move the js file to /src/js
gulp.task('js', function () {
   return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.min.js', 'node_modules/jquery/dist/jquery.min.js', 'node_modules/popper.js/dist/umd/popper.min.js'])
       .pipe(gulp.dest("src/js"))
       .pipe(browserSync.stream());
});



// Static server + watching scss/html files
gulp.task('serve' , ['sass'], function () {

   browserSync.init({
        server: "./src"
   });

   gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss'], ['sass']);
   gulp.watch("src/*.html").on('change', browserSync.reload);
});


// We can define gulp task using task()
// Here when we run gulp , two tasks named js and serve will run
gulp.task('default' , ['js', 'serve']);