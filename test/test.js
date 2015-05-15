var should = require('should');
var flowfact = require('../index')();

describe('User methods', function() {
	it('should fetch availible users', function (done) {
		flowfact
			.getUsers()
			.then(function (res) {
				res.should.be.Array;
				res.length.should.be.above(0);
				done();
			});
	});

	it('should fetch user details', function (done) {
		flowfact
			.getUser('10000200-0000-4012-0018-00001B3B30F6')
			.then(function (res) {
				res['$'].should.have.property('id', '10000200-0000-4012-0018-00001B3B30F6');
				done();
			});
	});

	it('should fetch user contacts', function (done) {
		flowfact
			.getUserContacts('10000200-0000-4012-0018-00001B3B30F6')
			.then(function (res) {
				res.should.have.property('contactshort');
				res.contactshort.should.be.Array;
				done();
			});
	});

	it('should fetch user activities', function (done) {
		flowfact
			.getUserActivities('10000200-0000-4012-0018-00001B3B30F6')
			.then(function (res) {
				res.should.have.property('activity');
				res.activity.should.be.Array;
				done();
			});
	});

	//it('should fetch user estates', function (done) {
	//	flowfact
	//		.getUserEstates()
	//		.then(function (res) {
	//			//res.should.be.Array;
	//			//res.length.should.be.above(0);
	//			done();
	//		});
	//});
});

describe('Company methods', function() {
	it('should fetch info on the company', function (done) {
		flowfact
			.getCompany()
			.then(function (res) {
				res.name[0].should.equal('Immo Erfolg GmbH');
				res['vat-id'][0].should.equal('DE 123456789');
				done();
			});
	});

	it('should fetch company quota', function (done) {
		flowfact
			.getCompanyQuota()
			.then(function (res) {
				res.totalavailablespaceinbyte[0].should.equal('4000000000');
				done();
			});
	});

	// TODO why timeout?
	//it('should fetch company logos', function (done) {
	//	flowfact
	//		.getCompanyLogos()
	//		.then(function (res) {
	//			//res.totalavailablespaceinbyte[0].should.equal('4000000000');
	//			done();
	//		});
	//});

	// TODO why timeout?
	//it('should fetch companys terms and conditions', function (done) {
	//	flowfact
	//		.getCompanyTermsAndConditions()
	//		.then(function (res) {
	//			//res.totalavailablespaceinbyte[0].should.equal('4000000000');
	//			done();
	//		});
	//});


});

