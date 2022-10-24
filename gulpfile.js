const gulp = require('gulp');
const clean = require('gulp-clean')
const replace = require('gulp-replace')
const cssnano = require('gulp-cssnano')
const concatCss = require('gulp-concat-css')
const fs = require('fs')
const open = require('gulp-open')
const run = require('gulp-run')
const semi = require('gulp-semi').add
const debug = require('gulp-debug');

const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')


gulp.task("runWebpack", () => {
  return new Promise((resolve, reject) => {
    webpack(webpackConfig, (err, stats) => {
      if (err) {
        return reject(err)
      }
      if (stats.hasErrors()) {
        return reject(new Error(stats.compilation.errors.join('\n')))
      }
      resolve()
    })
  })
})

gulp.task('semi', function() {
  return gulp.src('src/js/**/*.js')
    .pipe(debug())
    .pipe(semi({ leading: true }))
    .pipe(gulp.dest('temp/js'));
});


gulp.task('clean', function () {
  return gulp.src('dist/*', { read: false })
    .pipe(clean())
})

gulp.task('generate-body', function () {
  return gulp.src(['src/template-body.html'])
    // .pipe(replace("<!--header-js-->", function (s) {
    //   var _file = fs.readFileSync('dist/js/header/bundle.min.js', 'utf8')
    //   return '<script>\n' + _file + '\n</script>'
    // }))
    .pipe(replace("<!--footer-js-->", function (s) {
      var _file = fs.readFileSync('dist/js/main.js', 'utf8')
      return '<script>\n' + _file + '\n</script>'
    })).pipe(replace("<!--style-->", function (s) {
      var _file = fs.readFileSync('dist/css/main.css', 'utf8')
      return '<style>\n' + _file + '\n</style>'
    }))
    .pipe(replace("<!--content-->", function (s) {
      var _file = fs.readFileSync('src/content.html', 'utf8')
      return _file
    }))
    .pipe(gulp.dest('dist/html/'))
})

gulp.task('generate-final', function () {
  return gulp.src(['src/template.html'])
    .pipe(replace("<!--body-->", function (s) {
      var _file = fs.readFileSync('dist/html/template-body.html', 'utf8')
      return '<body>\n' + _file + '\n</body>'
    }))
    .pipe(replace("<!--imports-->", function (s) {
      var _file = fs.readFileSync('src/imports.html', 'utf8')
      return _file
    }))
    .pipe(gulp.dest('dist/html/'))
})

gulp.task('watch', function () {
  gulp.watch('src/**/*.*', gulp.series('build'))
})

gulp.task('minify', function () {
  return gulp.src('src/css/*.css')
    .pipe(concatCss("main.css"))
    .pipe(cssnano("main.css"))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('preview', async function () {
  var options = {
    uri: __dirname + '/dist/html/template.html',
    app: 'firefox'
  }
  gulp.src(__filename)
    .pipe(open(options))
})

gulp.task('clipboard', function () {
  return run('py util/copyToClipboard.py').exec()
})

gulp.task('build-css', gulp.series('minify'))
gulp.task('build', gulp.series('clean', 'build-css', 'runWebpack'))
gulp.task('clip', gulp.series('build', 'clipboard'))
gulp.task('prev', gulp.series('build', 'preview'))
