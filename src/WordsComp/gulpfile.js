var gulp = require('gulp');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var ts = require('gulp-typescript');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');

const customTsSrc = path.join(__dirname, './wwwroot/tscripts');
const dest = path.join(__dirname, './wwwroot');
const dependenciesTsSrc = path.join(__dirname, './node_modules');

var customTsScripts = [`${customTsSrc}/common.ts`,
                       `${customTsSrc}/app.ts`,
                       `${customTsSrc}/interfaces/*.ts`,
                       `${customTsSrc}/models/User.ts`,
                       `${customTsSrc}/models/group.ts`,
                       `${customTsSrc}/services/hubConnectionService.ts`,
                       `${customTsSrc}/services/connectToGameService.ts`,
                       `${customTsSrc}/controllers/connectionController.ts`];

var dependenciesTsScripts = [`${dependenciesTsSrc}/angular/angular.js`,
                             `${dependenciesTsSrc}/jquery/dist/jquery.js`,
                             `${dependenciesTsSrc}/signalr/jquery.signalR.js`]; 

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

gulp.task('build', function() {
  runSequence(
        [
            'buildJs',
            'buildIndexHtml'
        ]);
});

gulp.task('watch', function() {
    gulp.watch(`${customTsSrc}/**/*.ts`, ['customTs']);
    gulp.watch(indexHtmlSrc, ['buildIndexHtml']);
});


