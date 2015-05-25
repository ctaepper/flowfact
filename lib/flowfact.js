var url = require('url');
var _ = require('underscore');
var request = require('request');
var q = require('q');
var chalk = require('chalk');

//request.debug = true;

module.exports = function () {
	if (!process.env.FLOWFACT_URL) throw new Error('missing env variable FLOWFACT_URL');
	var parsed = url.parse(process.env.FLOWFACT_URL);
	var username = parsed.auth.split(':')[0];
	var password = parsed.auth.split(':')[1];
	var contractId = parsed.hostname;

	return new Flowfact(username, password, contractId);
};

function Flowfact(username, password, contractId) {
	this.user = contractId + '/' + username;
	this.pass = password;
	this.contractId = contractId;
	this.protocol = 'https://';
	this.base = 'flowfactapi.flowfact.com/com.flowfact.server/api/rest/v1.0/customers/' + contractId;
}

_.extend(Flowfact.prototype, {
	_get: function (resource, opts) {
		var deferred = q.defer();
		resource = this.protocol + this.base + resource;
		opts = _.defaults({}, opts, {
			headers: {
				'Accept': 'application/json'
			}
		});

		console.log(chalk.gray('    ' + resource));
		request
			.get(resource, opts, function(err, response, body) {
				if(err) return deferred.reject(err);
				deferred.resolve(JSON.parse(body).value);
			})
			.auth(this.user, this.pass, true);
		return deferred.promise;
	}
},
	require('./users'),
	require('./company'),
	require('./estates')
);

