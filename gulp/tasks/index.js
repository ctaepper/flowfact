/* jshint unused: false */
var _ = require('underscore');
var tasks = require('require-dir')('.', {recurse: true});

module.exports = function (gulp, config, pjson) {
	parseTask(tasks, [], arguments);
};

function parseTask(task, name, args) {
	if (typeof task === 'function') registerTask(task, name, args);
	else {
		_.each(task, function (t, n) {
			parseTask(t, _.union(name, [n]), args);
		});
	}
}

function registerTask(fn, key, args) {
	for (var i = 1; i <= key.length; i++) {
		var test = _.first(key, i);
		if (!_.has(args[1].gulp, test.join('.'))) args[1].gulp[test.join('.')] = {};
	}
	fn(args[0], args[1], args[2]);
}
