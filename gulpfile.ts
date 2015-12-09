import * as gulp from 'gulp';
import * as runSequence from 'run-sequence';
import {ENV} from './tools/config';
import {loadTasks, task} from './tools/utils';


// --------------
// Configuration.
loadTasks();

// --------------
// Clean (override).
gulp.task('clean',       task('clean', 'all'));
gulp.task('clean.dist',  task('clean', 'dist'));
gulp.task('clean.test',  task('clean', 'test'));
gulp.task('clean.tmp',   task('clean', 'tmp'));

// --------------
// Postinstall.
gulp.task('postinstall', done =>
  runSequence('clean',
              'npm',
              done));

// --------------
// Build dev.
gulp.task('build.dev', done =>
  runSequence('clean.dist',
              // 'tslint',
              'build.sass.dev',
              'build.images.dev',
              'build.js.dev',
              'build.index',
              done));

// --------------
// Build prod.
gulp.task('build.prod', done =>
  runSequence('clean.tmp',
              'clean.dist',
              'tslint',
              'build.sass.dev',
              'build.images.dev',
              'build.html_css.prod',
              'build.deps',
              'build.js.prod',
              'build.bundles',
              'build.index',
              done));

// --------------
// Watch.
gulp.task('build.dev.watch', done =>
  runSequence('build.dev',
              'watch.dev',
              done));

gulp.task('build.test.watch', done =>
  runSequence('build.test',
              'watch.test',
              done));

// --------------
// Test.
gulp.task('test', done =>
  runSequence('clean.test',
              'tslint',
              'build.test',
              'karma.start',
              done));

// --------------
// Serve.
gulp.task('serve', done =>
  runSequence(`build.${ENV}`,
              'server.start',
              'watch.serve',
              done));

// --------------
// Docs
gulp.task('docs', done =>
  runSequence('build.docs',
              'serve.docs',
              done));

// --------------
// Build prod.
// To be implemented (https://github.com/mgechev/angular2-seed/issues/58)
// Will start implementation when Angular 2 will get close to a stable release.