var _ = require('lodash');
var url = require('url');
var core = require('./flowfactCore');


if (process.env.FLOWFACT_URL) {
	var parsed = url.parse(process.env.FLOWFACT_URL);
	var username = parsed.auth.split(':')[0];
	var password = parsed.auth.split(':')[1];
	var contractId = parsed.hostname;
	_.extend(core.config, {
		username: username,
		password: password,
		contractId: contractId
	});
}


module.exports = function (opts) {
	core.config = _.defaults({}, opts, core.config);
};
