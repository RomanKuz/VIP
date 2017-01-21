var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var gulpCopy = require('gulp-copy');
var gulpif = require('gulp-if');

const customTsSrc = path.join(__dirname, './src/tscripts');
var dest = null;
const dependenciesTsSrc = path.join(__dirname, './node_modules');

var customTsScripts = [`${customTsSrc}/common.ts`,
    `${customTsSrc}/mixins/*.ts`,
    `${customTsSrc}/app.ts`,
    `${customTsSrc}/interfaces/*.ts`,
    `${customTsSrc}/models/*.ts`,
    `${customTsSrc}/services/*.ts`,
    `${customTsSrc}/controllers/*.ts`,
    `${customTsSrc}/animations/*.ts`,
    `${customTsSrc}/dom/*.ts`
];

var dependenciesTsScripts = [`${dependenciesTsSrc}/angular/angular.js`,
    `${dependenciesTsSrc}/jquery/dist/jquery.js`,
    `${dependenciesTsSrc}/signalr/jquery.signalR.min.js`, // not minified file, minified is broken
    `${dependenciesTsSrc}/angular-animate/angular-animate.js`,
    `${dependenciesTsSrc}/bootstrap-less/js/bootstrap.js`,
    `${dependenciesTsSrc}/angular-bootstrap-npm/dist/angular-bootstrap.js`,
    `${dependenciesTsSrc}/rx/dist/rx.lite.js`,
    `${dependenciesTsSrc}/rx-angular/dist/rx.angular.js`,
    `${dependenciesTsSrc}/spin.js/spin.js`,
    `${dependenciesTsSrc}/angular-spinner/angular-spinner.js`,
    `${dependenciesTsSrc}/clipboard/dist/clipboard.js`,
    `${dependenciesTsSrc}/jwt-decode/build/jwt-decode.js`
];

var shouldBeMinified = false;

function customiseEnv(env) {
    if (env === 'prod') {
        shouldBeMinified = true;
        dependenciesTsScripts.forEach(function(value, index) {
            if (dependenciesTsScripts[index].indexOf('.min.js') === -1) {
                dependenciesTsScripts[index] = value.replace(new RegExp('.js$'), '.min.js');
            }
        });
        dest = path.join(__dirname, './dist');
    } else {
        shouldBeMinified = false;
        dest = path.join(__dirname, './dev');
    }
}

var lessDependencies = `${dependenciesTsSrc}/bootstrap-less/bootstrap/bootstrap.less`;
var customLess = path.join(__dirname, './src/customLess/common.less');
var cssDependencies = [`${dependenciesTsSrc}/angular-busy/angular-busy.css`,
    `${dependenciesTsSrc}/font-awesome/css/font-awesome.css`
];
var fontDependencies = `${dependenciesTsSrc}/font-awesome/fonts/*.*`;
var indexHtmlSrc = path.join(__dirname, './src/index.html');

gulp.task('customTs', function() {
    gulp.src(customTsScripts)
        .pipe(gulpif(!shouldBeMinified, sourcemaps.init()))
        .pipe(ts({
            out: 'custom.js'
        }))
        .pipe(gulpif(shouldBeMinified, uglify({ mangle: false }))) // mangle: false - quick fix for broken angular DI
        .pipe(gulpif(!shouldBeMinified, sourcemaps.write()))
        .pipe(gulp.dest(dest));
});

gulp.task('globalTs', function() {
    gulp.src(dependenciesTsScripts)
        .pipe(concat('global.js'))
        .pipe(gulp.dest(dest));
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
        .pipe(gulp.dest(dest));
});

gulp.task('dependenciesLess', function() {
    gulp.src(lessDependencies)
        .pipe(gulpif(!shouldBeMinified, sourcemaps.init()))
        .pipe(less())
        .pipe(gulpif(!shouldBeMinified, sourcemaps.write()))
        .pipe(gulp.dest(dest));
});

gulp.task('customLess', function() {
    gulp.src(customLess)
        .pipe(gulpif(!shouldBeMinified, sourcemaps.init()))
        .pipe(less())
        .pipe(gulpif(!shouldBeMinified, sourcemaps.write()))
        .pipe(gulp.dest(dest));
});

gulp.task('cssDependencies', function() {
    gulp.src(cssDependencies)
        .pipe(concat('external.css'))
        .pipe(gulp.dest(dest));
});

gulp.task('_internalBuild', function() {
    runSequence(
        [
            'buildJs',
            'dependenciesLess',
            'cssDependencies',
            'customLess',
            'buildIndexHtml',
            'copyFonts'
        ]);
});

gulp.task('copyFonts', function() {
    gulp.src(fontDependencies)
        .pipe(gulp.dest(dest + "/fonts"));
})

gulp.task('build', function() {
    customiseEnv('dev');
    runSequence(
        [
            '_internalBuild'
        ]);
});

gulp.task('buildProd', function() {
    customiseEnv('prod');
    runSequence(
        [
            '_internalBuild'
        ]);
});

gulp.task('watch', function() {
    customiseEnv('dev');
    gulp.watch(`${customTsSrc}/**/*.ts`, ['customTs']);
    gulp.watch(indexHtmlSrc, ['buildIndexHtml']);
    gulp.watch(customLess, ['customLess']);
});