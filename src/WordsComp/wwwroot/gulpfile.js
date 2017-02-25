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
var fs = require('fs');

const customTsSrc = path.join(__dirname, './src/tscripts');
var dest = null;
const dependenciesJsSrc = path.join(__dirname, './node_modules');
const bowerDependencies = path.join(__dirname, './bower_components');

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

var dependenciesJsScripts = [`${dependenciesJsSrc}/angular/angular.js`,
    `${dependenciesJsSrc}/jquery/dist/jquery.js`,
    `${dependenciesJsSrc}/signalr/jquery.signalR.min.js`, // not minified file, minified is broken
    `${dependenciesJsSrc}/angular-animate/angular-animate.js`,
    `${dependenciesJsSrc}/bootstrap-less/js/bootstrap.js`,
    `${dependenciesJsSrc}/angular-bootstrap-npm/dist/angular-bootstrap.js`,
    `${dependenciesJsSrc}/rx/dist/rx.lite.js`,
    `${dependenciesJsSrc}/rx-angular/dist/rx.angular.js`,
    `${dependenciesJsSrc}/spin.js/spin.js`,
    `${dependenciesJsSrc}/angular-spinner/angular-spinner.js`,
    `${dependenciesJsSrc}/clipboard/dist/clipboard.js`,
    `${dependenciesJsSrc}/jwt-decode/build/jwt-decode.js`,
    `${bowerDependencies}/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js`,
    `${bowerDependencies}/angular-bootstrap-slider/slider.js`
];

var shouldBeMinified = false;

function customiseEnv(env) {
    if (env === 'prod') {
        shouldBeMinified = true;
        dependenciesJsScripts.forEach(function(value, index) {
            // TODO: Remove this if
            if (dependenciesJsScripts[index].indexOf('.min.js') === -1) {
                var minifiedVersion = value.replace(new RegExp('.js$'), '.min.js');

                // replace dependency with minified version if one exists
                if (fs.existsSync(minifiedVersion)) {
                    dependenciesJsScripts[index] = minifiedVersion;
                }
            }
        });
        dest = path.join(__dirname, './dist');
    } else {
        shouldBeMinified = false;
        dest = path.join(__dirname, './dev');
    }
}

var lessDependencies = `${dependenciesJsSrc}/bootstrap-less/bootstrap/bootstrap.less`;
var customLess = path.join(__dirname, './src/customLess/common.less');
var cssDependencies = [`${dependenciesJsSrc}/angular-busy/angular-busy.css`,
    `${dependenciesJsSrc}/font-awesome/css/font-awesome.css`,
    `${bowerDependencies}/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css`
];
var fontDependencies = `${dependenciesJsSrc}/font-awesome/fonts/*.*`;
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
    gulp.src(dependenciesJsScripts)
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