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
    `${dependenciesTsSrc}/signalr/jquery.signalr.js`,
    `${dependenciesTsSrc}/angular-animate/angular-animate.js`,
    `${dependenciesTsSrc}/bootstrap-less/js/bootstrap.js`,
    `${dependenciesTsSrc}/angular-bootstrap-npm/dist/angular-bootstrap.js`,
    `${dependenciesTsSrc}/rx/dist/rx.lite.js`,
    `${dependenciesTsSrc}/rx-angular/dist/rx.angular.js`,
    `${dependenciesTsSrc}/angular-busy/dist/angular-busy.js`
];

var shouldBeMinified = false;

function customiseEnv(env) {
    if (env === 'prod') {
        shouldBeMinified = true;
        dependenciesTsScripts.forEach(function(value, index) {
            dependenciesTsScripts[index] = value.replace('.js', '.min.js');
        });
        dest = path.join(__dirname, './dist');
    } else {
        shouldBeMinified = false;
        dest = path.join(__dirname, './dev');
    }
}

var lessDependencies = `${dependenciesTsSrc}/bootstrap-less/bootstrap/bootstrap.less`;
var customLess = path.join(__dirname, './src/customLess/common.less');
var cssDependencies = `${dependenciesTsSrc}/angular-busy/angular-busy.css`;

var indexHtmlSrc = path.join(__dirname, './src/index.html');

gulp.task('customTs', function() {
    var pipeline = gulp.src(customTsScripts)
        .pipe(sourcemaps.init())
        .pipe(ts({
            out: 'custom.js'
        }));
    if (shouldBeMinified) {
        pipeline = pipeline.pipe(uglify());
    }
    pipeline.pipe(sourcemaps.write())
        .pipe(gulp.dest(dest));
});

gulp.task('globalTs', function() {
    gulp.src(dependenciesTsScripts)
        .pipe(sourcemaps.init())
        .pipe(concat('global.js'))
        .pipe(sourcemaps.write())
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
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest));
});

gulp.task('customLess', function() {
    gulp.src(customLess)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(dest));
});

gulp.task('cssDependencies', function() {
    gulp.src(cssDependencies)
        .pipe(gulp.dest(dest));
});

gulp.task('_internalBuild', function() {
    runSequence(
        [
            'buildJs',
            'dependenciesLess',
            'cssDependencies',
            'customLess',
            'buildIndexHtml'
        ]);
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