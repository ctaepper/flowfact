var _ = require('underscore');

var defaults = {
	task: 'release.version',
	glob: ['./package.json', './bower.json'],
	origin: 'origin',
	branch: 'master'
};

module.exports = function (gulp, config, pjson) {
	var c = config.gulp[defaults.task] = _.defaults({}, config.gulp.release.tag, defaults);

	gulp.task(c.task, function (cb) {
		var semver = require('semver');
		var args = require('yargs').argv;
		var bump = require('gulp-bump');
		var git = require('gulp-git');
		var async = require('async');

		var incType = null;
		if (args.patch) incType = 'patch';
		if (args.minor) incType = 'minor';
		if (args.major) incType = 'major';
		if (!incType) incType = 'patch';

		var newVersion = semver.inc(pjson.version, incType);

		async.series([
			function (cbi) {
				gulp.src(c.glob)
					.pipe(bump({version: newVersion}))
					.pipe(gulp.dest('./'))
					.pipe(git.commit('bump version to ' + newVersion, {quiet: true}))
					.on('error', function (err) {
						cbi(err);
					})
					.on('end', function () {
						cbi();
					});
			},
			function (cbi) {
				git.push(c.origin, c.branch, {quiet: true}, cbi);
			},
			function (cbi) {
				git.tag('v' + newVersion, 'release v' + newVersion, {quiet: true}, cbi);
			},
			function (cbi) {
				git.push(c.origin, 'v' + newVersion, {quiet: true}, cbi);
			}
		], function (err) {
			if (err) return gulp.utils.onError(err);
			cb();
		});
	});
};
