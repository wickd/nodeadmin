var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var livereload = require('gulp-livereload');
var clear = require('clear');
var apidoc = require('gulp-apidoc');
var cleanCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
let config = require('config');

var script = 'index.js';

for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] == '--environment') {
        if (process.argv[i + 1] == 'pro') {
            process.env.NODE_ENV = 'live'
            process.env.NODE_CONFIG_DIR = './config'
        }
        else if (process.argv[i + 1] == 'test') {
            process.env.NODE_ENV = 'test'
            process.env.NODE_CONFIG_DIR = './config'
        }
        else {
            process.env.NODE_ENV = 'localhost'
            // process.env.NODE_ENV = 'index'
            process.env.NODE_CONFIG_DIR = './config'
        }
    }
    console.log(process.env);
}

/**
 * livereload
 */
var server = function () {
    return gulp.src(script).pipe(livereload());
};

/**
 * apidoc
 */
var apidocjs = function () {
    return apidoc({
        src: 'app/',
        dest: 'public/apidoc/',
        config: './',
        debug: false,
        includeFilters: ['.*\\.js$']
    }, function () {
    });
};

/**
 * nodemon
 */
var nodemonjs = function () {
    return nodemon({
        script: script,
        ignore: 'public/*'
    }).on('restart', function () {
        clear();
        // apidocjs();
        server();
    });
};

// Task-------------------------
gulp.task('default', ['nodemon']);

gulp.task('nodemon', nodemonjs);