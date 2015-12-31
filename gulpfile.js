/*
 |--------------------------------------------------------------------------
 | Dependencies
 |--------------------------------------------------------------------------
 */
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var del = require('del');
var rename = require('gulp-rename');
var cssmin = require("gulp-minify-css");
var stripCssComments = require('gulp-strip-css-comments');
var replace = require('gulp-replace');
var concat = require("gulp-concat");
var watch = require("gulp-watch");
var format = require("string-template");
var runSequence = require('run-sequence');

var paths = {
    scripts: [
        "./source/js/libs/three.min.js",
        "./source/js/libs/OBJLoader.js",
        "./source/js/libs/OrbitControls.js",
        "./source/js/libs/hammer.min.js",
        "./source/js/trex/Model.js",
        "./source/js/trex/View.js",
        "./source/js/trex/Controller.js"
    ],
    styles: [
        "./source/css/style.css"
    ]
};



/*
 |--------------------------------------------------------------------------
 | Production
 |--------------------------------------------------------------------------
 |
 | The task for production will go in this section
 |
 */
gulp.task('jsProduction', function() {

    return gulp.src(paths.scripts)
        .pipe(concat("app.js"))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('cssProduction', function() {

    return gulp.src(paths.styles)
        .pipe(concat("app.css"))
        .pipe(stripCssComments({
            all: true
        }))
        .pipe(cssmin())
        .pipe(gulp.dest('dist/css/'));


});

/*
 |--------------------------------------------------------------------------
 | Development
 |--------------------------------------------------------------------------
 |
 | The task for development will go in this section
 |
 */
gulp.task('jsDevelopment', function() {

    return gulp.src(paths.scripts)
        .pipe(concat("app.js"))
        .pipe(gulp.dest('dist/js'));
});

gulp.task('cssDevelopment', function() {
    return gulp.src(paths.styles)
        .pipe(concat("app.css"))
        .pipe(gulp.dest('dist/css'));

});


/*
 |--------------------------------------------------------------------------
 | Utilities
 |--------------------------------------------------------------------------
 |
 | Utilities tasks
 |
 */
gulp.task('clean', function(cb) {
    del(['dist'], cb);
});
gulp.task('copy', function() {
    gulp.src(['source/objs/**/*']).pipe(gulp.dest('dist/objs/'));
    gulp.src(['source/img/**/*']).pipe(gulp.dest('dist/img/'));
});
/*
 |--------------------------------------------------------------------------
 | Watch
 |--------------------------------------------------------------------------
 |
 | All the watch tasks here!
 |
 */


gulp.task('watchcss', function() {
    return gulp.watch(['source/css/**/*.css'], ["cssDevelopment"]);
});

gulp.task('watchjs', function() {
    gulp.watch(['source/js/**/*.js'], ['jsDevelopment']);
});

/*
 |--------------------------------------------------------------------------
 | Gulp tasks group
 |--------------------------------------------------------------------------
 */
gulp.task('default', function() {
    runSequence("clean", 'jsProduction', "cssProduction", "copy");
});
gulp.task('dev', function() {
    runSequence("clean", 'jsDevelopment', "cssDevelopment", "copy");
});
gulp.task('productionjs', ['jsProduction']);
gulp.task('productioncss', ['cssProduction', "copy"]);
