var should = require('should');
var flowfact = require('../index')();
var _ = require('underscore');

var demoId = '10000200-0000-4012-0018-00001B3B30F6';

describe('User methods', function() {
	it('should fetch availible users', function (done) {
		flowfact
			.getUsers()
			.then(function (res) {
				res.should.be.Array;
				res.length.should.be.above(0);
				done();
			}, function (err) {
				done(err);
			});
	});

	it('should fetch user details', function (done) {
		flowfact
			.getUser(demoId)
			.then(function (res) {
				res.email.should.equal('klaus.erfolg@immo-erfolg.de');
				res.id.should.equal(demoId);
				done();
			}, function (err) {
				done(err);
			});
	});

	it('should fetch user contacts', function (done) {
		flowfact
			.getUserContacts(demoId)
			.then(function (res) {
				res.should.have.property('contactshort');
				res.contactshort.should.be.Array;
				done();
			});
	});

	it('should fetch user activities', function (done) {
		flowfact
			.getUserActivities(demoId)
			.then(function (res) {

				res.should.have.property('activity');
				res.activity.should.be.Array;
				done();
			});
	});
});

describe('Company methods', function() {
	it('should fetch info on the company', function (done) {
		flowfact
			.getCompany()
			.then(function (res) {
				res.name.should.equal('Immo Erfolg GmbH');
				res['vat-id'].should.equal('DE 123456789');
				done();
			});
	});

	it('should fetch company quota', function (done) {
		flowfact
			.getCompanyQuota()
			.then(function (res) {
				res.should.have.property('currentlyusedinbyte');
				res.totalavailablespaceinbyte.should.equal(4000000000);
				done();
			});
	});

	//// TODO why 404?
	//it('should fetch company logos', function (done) {
	//	flowfact
	//		.getCompanyLogos()
	//		.then(function (res) {
	//			console.log(res);
	//			//res.totalavailablespaceinbyte[0].should.equal('4000000000');
	//			done();
	//		});
	//});
    //
	//// TODO why 404?
	//it('should fetch companys terms and conditions', function (done) {
	//	flowfact
	//		.getCompanyTermsAndConditions()
	//		.then(function (res) {
	//			console.log(res);
	//			//res.totalavailablespaceinbyte[0].should.equal('4000000000');
	//			done();
	//		});
	//});


});


describe('Estates methods', function() {

	var estateshort = null;

	it('should fetch estates', function (done) {
		flowfact
			.getEstates(demoId)
			.then(function (res) {
				res.should.have.property('estateshort');
				res.estateshort.should.be.Array;
				estateshort = res.estateshort;
				done();
			});
	});

	it('should fetch estate detail', function (done) {

		var detailId = _.first(estateshort).id;

		flowfact
			.getEstate(demoId, detailId)
			.then(function (res) {
				res.should.have.property('id', detailId);
				res.should.have.property('headline');
				done();
			});
	});

});
