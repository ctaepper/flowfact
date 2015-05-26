/* jshint unused: false */

var pjson = require('./package.json');
var gulp = require('gulp');
var run = require('run-sequence');
gulp.utils = require('./gulp/utils');

require('./gulp/tasks')(gulp, {gulp: {}}, pjson);

gulp.task('release', function (cb) {
	run('release.version', 'npm.publish', cb);
});
