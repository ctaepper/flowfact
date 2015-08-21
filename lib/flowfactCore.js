var _ = require('lodash');
var request = require('request');

var buildRequest = function (method, path) {

	var uri = '';
	_.each(path, function (part) {
		if (_.isObject(part)) {
			uri += '/' + _.keys(part)[0] + '/' + _.values(part)[0];
		} else {
			uri += '/' + part;
		}
	});

	return {
		method: method,
		uri: core.config.protocol + core.config.base + 'v' + core.config.apiVersion + '/customers/' + core.config.contractId + uri,
		auth: {
			user: core.config.contractId + '/' + core.config.username,
			pass: core.config.password,
			sendImmediately: true
		},
		headers: {
			Accept: core.config.contentType
		}
	};
};


var appendQiBody = function (qi, opts) {

	opts.uri = opts.uri + '/query';

	var xmlHeader = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><query xmlns="http://www.flowfact.com/schema/rest">';
	var xmlBody = '';
	var xmlFooter = '</query>';

	_.each(qi.item, function (item) {
		var pre = '<item>';
		var post = '</item>';

		var pair = _.values(item)[0];

		pre += '<propertyname>' + _.keys(item)[0] + '</propertyname>';
		pre += '<operator>' + _.keys(pair)[0] + '</operator>';

		pre += '<queryvalues>';
		post = '</queryvalues>' + post;

		pre += '<queryvalue>';
		post = '</queryvalue>' + post;

		pre += '<value>';
		post = '</value>' + post;

		pre += '<value>' + _.values(pair)[0] + '</value>';

		xmlBody += pre + post;
	});

	return _.merge(opts, {
		headers: {
			'Content-Type': 'application/xml'
		},
		body: xmlHeader + xmlBody + xmlFooter
	});
};

var core = {
	config: {
		debug: false,
		apiVersion: '1.0',
		protocol: 'https://',
		base: 'flowfactapi.flowfact.com/com.flowfact.server/api/rest/',
		contentType: 'application/json'
	},

	'get': function (path, cb) {
		//request.debug = core.config.debug;
		var opts = {};
		opts = buildRequest('GET', path);
		if (core.config.debug) console.log(opts);
		request(opts, function (err, response, body) {
			if(err) return cb(err);
			if(_.isEmpty(body)) return cb('empty response');

			// TODO report bug to flowfact:
			// inquiries resource doesnt have value wrapper
			body = JSON.parse(body);
			cb(null, body.value || body);
		});
	},

	query: function (path, qi, cb) {
		//request.debug = core.config.debug;
		var opts = {};
		opts = buildRequest('POST', path);
		opts = appendQiBody(qi, opts);
		if (core.config.debug) console.log(opts);
		request(opts, function (err, response, body) {
			//console.log(arguments);
			if(err) return cb(err);
			if(_.isEmpty(body)) return cb('empty response');

			// TODO report bug to flowfact:
			// inquiries resource doesnt have value wrapper
			body = JSON.parse(body);
			cb(null, body.value || body);
		});
	}
};

module.exports = core;
