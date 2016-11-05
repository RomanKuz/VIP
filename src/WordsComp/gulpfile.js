var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var less = require('gulp-less');

const customTsSrc = path.join(__dirname, './wwwroot/tscripts');
const dest = path.join(__dirname, './wwwroot');
const dependenciesTsSrc = path.join(__dirname, './node_modules');

var customTsScripts = [`${customTsSrc}/common.ts`,
    `${customTsSrc}/app.ts`,
    `${customTsSrc}/interfaces/*.ts`,
    `${customTsSrc}/models/*.ts`,
    `${customTsSrc}/services/*.ts`,
    `${customTsSrc}/controllers/*.ts`,
    `${customTsSrc}/animations/*.ts`
];

var dependenciesTsScripts = [`${dependenciesTsSrc}/angular/angular.js`,
    `${dependenciesTsSrc}/jquery/dist/jquery.js`,
    `${dependenciesTsSrc}/signalr/jquery.signalR.js`,
    `${dependenciesTsSrc}/bootstrap-less/js/bootstrap.js`,
    `${dependenciesTsSrc}/angular-bootstrap-npm/dist/angular-bootstrap.js`,
    `${dependenciesTsSrc}/rx/dist/rx.all.js`,
    `${dependenciesTsSrc}/rx-angular/dist/rx.angular.js`,
    `${dependenciesTsSrc}/angular-busy/angular-busy.js`,
    `${dependenciesTsSrc}/angular-animate/angular-animate.js`
];

var lessDependencies = `${dependenciesTsSrc}/bootstrap-less/bootstrap/bootstrap.less`;
var customLess = `${dest}/customLess/common.less`;
var cssDependencies = `${dependenciesTsSrc}/angular-busy/angular-busy.css`;

var indexHtmlSrc = path.join(__dirname, 'index.html');

gulp.task('customTs', function() {
    gulp.src(customTsScripts)
        .pipe(sourcemaps.init())
        .pipe(ts({
            out: 'custom.js'
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${dest}`));
});

gulp.task('globalTs', function() {
    gulp.src(dependenciesTsScripts)
        .pipe(concat('global.js'))
        .pipe(gulp.dest(`${dest}`));
});

gulp.task('buildJs', function() {
    runSequence(
        [
            'globalTs',
            'customTs'
        ]);
});

gulp.task('buildIndexHtml', function() {
    gulp.src(indexHtmlSrc)
        .pipe(gulp.dest(`${dest}`));
});

gulp.task('dependenciesLess', function() {
    gulp.src(lessDependencies)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${dest}`));
});

gulp.task('customLess', function() {
    gulp.src(customLess)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(`${dest}`));
});

gulp.task('cssDependencies', function() {
    gulp.src(cssDependencies)
        .pipe(gulp.dest(`${dest}`));
});

gulp.task('build', function() {
    runSequence(
        [
            'buildJs',
            'dependenciesLess',
            'cssDependencies',
            'buildIndexHtml'
        ]);
});

gulp.task('watch', function() {
    gulp.watch(`${customTsSrc}/**/*.ts`, ['customTs']);
    gulp.watch(indexHtmlSrc, ['buildIndexHtml']);
    gulp.watch(customLess, ['customLess']);
});