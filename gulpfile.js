const gulp = require('gulp')
const spawn = require('cross-spawn')
const gulpsync = require('gulp-sync')(gulp)
const del = require('del')

gulp.task('build-react', () => {
  spawn('npm', ['run', 'build'], { cwd: 'client/', stdio: 'inherit' }).on('close', () => {
    gulp.src('./client/build/**/*')
      .pipe(gulp.dest('./server/public/'))
  })
})
gulp.task('clear', function () {
  return del([
    './client/build/*',
    './server/public/*'
  ], { force: true })
})
gulp.task('build', gulpsync.sync(['clear', 'build-react']))
gulp.task('default', ['build'])
