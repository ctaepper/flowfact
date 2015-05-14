var url = require('url');
var _ = require('underscore');
var rest = require('restler');
var q = require('Q');

var DEBUG = false;

module.exports = function () {
	if (!process.env.FLOWFACT_URL) throw new Error('missing env variable FLOWFACT_URL');
	var parsed = url.parse(process.env.FLOWFACT_URL);
	var username = parsed.auth.split(':')[0];
	var password = parsed.auth.split(':')[1];
	var contractId = parsed.hostname;

	return new Flowfact(username, password, contractId);
};

function Flowfact(username, password, contractId) {
	this.user = encodeURIComponent(contractId + '/' + username);
	this.pass = password;
	this.contractId = contractId;
	this.protocol = 'https://';
	this.base = 'flowfactapi.flowfact.com/com.flowfact.server/api/rest/v1.0/customers/' + contractId;
}

_.extend(Flowfact.prototype, {
	_get: function (resource, opts) {
		var deferred = q.defer();
		resource = this.protocol + this.user + ':' + this.pass + '@' + this.base + resource;
		opts = _.defaults({}, opts, {
			headers: {
				'Accept': 'application/xml'
			}
		});

		debug(resource);
		debug(opts);

		rest
			.get(resource, opts)
			.on('success', deferred.resolve)
			.on('fail', deferred.reject)
			.on('error', deferred.reject);
		return deferred.promise;
	}
}, require('./users'), require('./company'), require('./estates'));

var debug = function (data) {
	if (DEBUG) console.log(data);
};
