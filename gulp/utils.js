var gutil = require('gulp-util');

module.exports = {
	onError: function (err) {
		gutil.beep();
		gutil.log(gutil.colors.black.bgRed.bold(err.plugin), gutil.colors.red(err.message));
		this.emit('end');
	}
};
