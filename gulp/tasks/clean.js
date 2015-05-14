var _ = require('underscore');

var defaults = {
	task: 'clean',
	glob: [
		'./node_modules'
	]
};

module.exports = function (gulp, config) {
	var c = config.gulp[defaults.task] = _.defaults({}, config.gulp.clean, defaults);

	gulp.task(c.task, function (cb) {
		var del = require('del');

		del(c.glob, cb);
	});
};
