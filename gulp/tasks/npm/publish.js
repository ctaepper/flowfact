var _ = require('underscore');

var defaults = {
	task: 'npm.publish'
};

module.exports = function (gulp, config) {
	var c = config.gulp[defaults.task] = _.defaults({}, config.gulp.npm.publish, defaults);

	gulp.task(c.task, function (cb) {
		var run = require('gulp-run');

		var publish = new run.Command('npm publish', {verbosity: 1});
		publish.exec(function (err) {
			if (err) {
				err.plugin = c.task;
				return gulp.utils.onError(err);
			}
			cb();
		});
	});
};
