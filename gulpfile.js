/* jshint unused: false */

var pjson = require('./package.json');
var gulp = require('gulp');
gulp.utils = require('./gulp/utils');

require('./gulp/tasks')(gulp, {gulp: {}}, pjson);
