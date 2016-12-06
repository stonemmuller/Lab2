var gulp = require("gulp");
var server = require('gulp-express');
var sass = require("gulp-sass");
var concat = require('gulp-concat');

gulp.task('sass', function ()
{
    gulp.watch('./sass/**/*.scss', ['sass']);

    gulp.src('./sass/startup.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css'))
});

gulp.task('server', function()
{
    gulp.run("bundle");
    gulp.run("sass");

    gulp.watch(['./src/server/**/*.js'], function(event)
    {
        server.stop();
        server.run(['./bin/www']);
    });

    gulp.watch(['./src/client/**/*.js'], function(event)
    {
        gulp.run("bundle");
    });

    gulp.watch(['./app.js'], function(event)
    {
        server.stop();
        server.run(['./bin/www']);
    });

    server.run(['./bin/www']);
});


var babelify   = require('babelify'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    gulp       = require('gulp'),
    gutil      = require('gulp-util'),
    livereload = require('gulp-livereload'),
    merge      = require('merge'),
    rename     = require('gulp-rename'),
    source     = require('vinyl-source-stream'),
    watchify   = require('watchify');

var config = {
    js: {
        src: './src/client/app.js',       // Entry point
        outputDir: './public/javascripts',  // Directory to save bundle to
        mapDir: './public/maps',      // Subdirectory to save maps to
        outputFile: './bundle.js' // Name to use for bundle
    },
};

// This method makes it easy to use common bundling options in different tasks
function bundle (bundler) {

    // Add options to add to "base" bundler passed as parameter
    bundler
        .bundle()                                                        // Start bundle
        .pipe(source(config.js.src))                        // Entry point
        .pipe(buffer())                                               // Convert to gulp pipeline
        .pipe(rename(config.js.outputFile))          // Rename output from 'main.js'
        //   to 'bundle.js'
        // .pipe(sourceMaps.init({ loadMaps : true }))  // Strip inline source maps
        // .pipe(sourceMaps.write(config.js.mapDir))    // Save source maps to their
        //   own directory
        .pipe(gulp.dest(config.js.outputDir))        // Save 'bundle' to build/
        .pipe(livereload());                                       // Reload browser if relevant
}

gulp.task('bundle', function () {
    var bundler = browserify(config.js.src)  // Pass browserify the entry point
        .transform(babelify, { presets : [ 'es2015' ] });  // Then, babelify, with ES2015 preset

    bundle(bundler);  // Chain other options -- sourcemaps, rename, etc.
});