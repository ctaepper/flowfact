var _ = require('lodash');
var Q = require('q');
var core = require('./flowfactCore');

function FlowfactResource (path) {
	this.path = path || [];
}

_.extend(FlowfactResource.prototype, {
	_add: function (part) {
		this.path.push(part);
	},

	'get': function (cb) {
		var defered = Q.defer();

		core.get(this.path, function (err, res) {

			if (err) {
				if (cb) cb(err);
				defered.reject(err);
				return;
			}

			if (cb) cb(null, res);
			defered.resolve(res);
		});

		return defered.promise;
	},

	query: function (qi, cb) {
		var defered = Q.defer();

		core.query(this.path, qi, function (err, res) {

			if (err) {
				if (cb) cb(err);
				defered.reject(err);
				return;
			}

			if (cb) cb(null, res);
			defered.resolve(res);
		});

		return defered.promise;
	}
});


_.each(['users', 'contacts', 'estates', 'characteristics', 'usergroups', 'portals', 'apps', 'inquiries', 'activities', 'offers', 'projects', 'pictures'], function (path) {

	FlowfactResource.prototype[path] = function (id) {
		var resource = new FlowfactResource(_.clone(this.path));

		if (_.isUndefined(id)) resource._add(path);
		else {
			var obj = {};
			obj[path] = id;
			resource._add(obj);
		}
		return resource;
	};
});

module.exports = FlowfactResource;
