/// <binding AfterBuild='build' Clean='clean' ProjectOpened='watch' />
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
var del = require('del');
var fs = require('fs');
var templateCache = require('gulp-angular-templatecache');

const customTsSrc = path.join(__dirname, './ClientApp/tscripts');
var dest = path.join(__dirname, './wwwroot');;
const npmDependencies = path.join(__dirname, './node_modules');
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

var dependenciesJsScripts = [`${npmDependencies}/angular/angular.js`,
    `${npmDependencies}/jquery/dist/jquery.js`,
    `${npmDependencies}/signalr/jquery.signalR.js`,
    `${npmDependencies}/angular-animate/angular-animate.js`,
    `${npmDependencies}/bootstrap-less/js/bootstrap.js`,
    `${npmDependencies}/angular-bootstrap-npm/dist/angular-bootstrap.js`,
    `${npmDependencies}/rx/dist/rx.lite.js`,
    `${npmDependencies}/rx-angular/dist/rx.angular.js`,
    `${npmDependencies}/spin.js/spin.js`,
    `${npmDependencies}/angular-spinner/angular-spinner.js`,
    `${npmDependencies}/clipboard/dist/clipboard.js`,
    `${npmDependencies}/jwt-decode/build/jwt-decode.js`,
    `${bowerDependencies}/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js`,
    `${bowerDependencies}/angular-bootstrap-slider/slider.js`,
    `${npmDependencies}/angular-route/angular-route.js`,
    `${npmDependencies}/satellizer/dist/satellizer.js`,
    `${npmDependencies}/ng-infinite-scroll/build/ng-infinite-scroll.js`
];

var shouldBeMinified = false;

function customiseEnv(env) {
    if (env === 'prod') {
        shouldBeMinified = true;
        dependenciesJsScripts.forEach(function(value, index) {
            var minifiedVersion = value.replace(new RegExp('.js$'), '.min.js');

            // replace dependency with minified version if one exists
            if (fs.existsSync(minifiedVersion)) {
                dependenciesJsScripts[index] = minifiedVersion;
            }
        });
    } else {
        shouldBeMinified = false;
    }
}

var lessDependencies = `${npmDependencies}/bootstrap-less/bootstrap/bootstrap.less`;
var customLess = path.join(__dirname, './ClientApp/customLess/common.less');
var cssDependencies = [`${npmDependencies}/angular-busy/angular-busy.css`,
    `${npmDependencies}/font-awesome/css/font-awesome.css`,
    `${bowerDependencies}/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css`
];
var fontDependencies = `${npmDependencies}/font-awesome/fonts/*.*`;
var GamePageTemplates = [
    path.join(__dirname, './ClientApp/html/pages/gamePage/modalTemplates/*.html'),
    path.join(__dirname, './ClientApp/html/pages/gamePage/gamePage.html')
];
var htmlDependencies = [
    path.join(__dirname, './ClientApp/html/index.html')
];

var vocabularyPage = './ClientApp/html/pages/vocabularyPage/vocabularyPage.html'

gulp.task('clean', function() {
    return del(['./wwwroot/*.js',
        './wwwroot/*.html',
        './wwwroot/*.css'
    ]);
});

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
    gulp.src(htmlDependencies)
        .pipe(gulp.dest(dest));
});

gulp.task('buildVocabularyPage', function() {
    gulp.src(vocabularyPage)
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
            'copyFonts',
            'gamePageTemplatesCache',
            'buildVocabularyPage'
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

gulp.task('gamePageTemplatesCache', function() {
    gulp.src(GamePageTemplates)
        .pipe(templateCache({
            standalone: true,
            module: 'templates'
        }))
        .pipe(gulp.dest(dest));
});

gulp.task('watch', function() {
    customiseEnv('dev');
    gulp.watch(`${customTsSrc}/**/*.ts`, ['customTs']);
    gulp.watch(htmlDependencies, ['buildIndexHtml']);
    gulp.watch(customLess, ['customLess']);
    gulp.watch(GamePageTemplates, ['gamePageTemplatesCache']);
    gulp.watch(vocabularyPage, ['buildVocabularyPage']);
});