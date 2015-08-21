var should = require('should');
var flowfact = require('../index');
var _ = require('lodash');


// set flowfact demo api user
flowfact.config({
	username: 'klaus.erfolg@immo-erfolg.de',
	password: 'YOSYGDXU14',
	contractId: 'apisandbox',
	debug: true
});


var demoUserId = '10000200-0000-4012-0018-00001B3B30F6';
var demoUserCharacteristicId = '10000200-1000-4092-0038-00001B3B30F6';


describe('Users', function() {
	it('should fetch availible users', function (done) {
		flowfact.users().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.user.should.be.an.Array;
			res.user.length.should.be.exactly(2);
			done();
		});
	});

	it('should fetch user details', function (done) {
		flowfact.users(demoUserId).get(function (err, res) {
			if (err) return done(err);
			res.email.should.equal('klaus.erfolg@immo-erfolg.de');
			res.id.should.equal(demoUserId);
			done();
		});
	});
});

//TODO Demo user has no usergroups...
//describe('Usergroups', function() {
//
//	var usergroupId = null;
//
//	it('should fetch characteristics', function (done) {
//		flowfact.usergroups().get(function (err, res) {
//			if (err) return done(err);
//			res.should.be.an.Object;
//			res.should.have.property('usergroup');
//			res.usergroup.should.be.an.Array;
//			res.usergroup.length.should.be.above(2);
//			usergroupId = res.usergroup[0].id;
//			done();
//		});
//	});
//
//	it('should fetch characteristic details', function (done) {
//		flowfact.usergroups(usergroupId).get(function (err, res) {
//			if (err) return done(err);
//			res.should.be.an.Object;
//			res.id.should.equal(usergroupId);
//			done();
//		});
//	});
//});

describe('Characteristics', function() {

	var characteristicId = null;

	it('should fetch characteristics', function (done) {
		flowfact.characteristics().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('characteristic');
			res.characteristic.should.be.an.Array;
			res.characteristic.length.should.be.above(2);
			characteristicId = res.characteristic[0].id;
			done();
		});
	});

	it('should fetch characteristic details', function (done) {
		flowfact.characteristics(characteristicId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(characteristicId);
			done();
		});
	});
});

describe('Apps', function() {

	var appId = null;

	it('should fetch apps', function (done) {
		flowfact.apps().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('products');
			res.products.should.be.an.Array;
			res.products.length.should.be.above(2);
			appId = res.products[0].id;
			done();
		});
	});

	//it('should fetch app details', function (done) {
	//	flowfact.apps(appId).get(function (err, res) {
	//		if (err) return done(err);
	//		res.should.be.an.Object;
	//		res.id.should.equal(appId);
	//		done();
	//	});
	//});
});

describe('Portals', function() {

	var portalsId = null;

	it('should fetch portals', function (done) {
		flowfact.portals().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('portal');
			res.portal.should.be.an.Array;
			res.portal.length.should.be.above(2);
			portalsId = res.portal[0].id;
			done();
		});
	});

	it('should fetch portal details', function (done) {
		flowfact.portals(portalsId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(portalsId);
			done();
		});
	});
});

describe('Contacts', function() {

	var user = flowfact.users(demoUserId);
	var contactId = null;

	it('should fetch users contacts', function (done) {
		//flowfact.config({debug: true});
		user.contacts().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('contactshort');
			res.contactshort.should.be.an.Array;
			res.contactshort.length.should.be.above(2);
			contactId = res.contactshort[0].id;
			done();
		});
	});

	it('should fetch contact details', function (done) {
		user.contacts(contactId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(contactId);
			done();
		});
	});
});


describe('Estates', function() {

	var user = flowfact.users(demoUserId);
	var estateId = null;

	it('should fetch estates', function (done) {
		user.estates().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('estateshort');
			res.estateshort.should.be.an.Array;
			res.estateshort.length.should.be.above(2);
			estateId = res.estateshort[0].id;
			done();
		});
	});

	it('should fetch users estates', function (done) {
		user.estates().query({item: [{characteristic: {EQUAL: demoUserCharacteristicId}}]}, function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('estateshort');
			res.estateshort.should.be.an.Array;
			res.estateshort.length.should.be.above(2);
			estateId = res.estateshort[0].id;
			done();
		});
	});

	it('should fetch estate detail', function (done) {
		user.estates(estateId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(estateId);
			done();
		});
	});

	it('should fetch estate pictures', function (done) {
		var estate = user.estates(estateId);
		estate.pictures().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('previewimage');
			res.should.have.property('estatepicture');
			res.estatepicture.should.be.an.Array;
			res.estatepicture.length.should.be.above(0);
			done();
		});
	});

});


describe('Activities', function() {

	var user = flowfact.users(demoUserId);
	var activityId = null;

	it('should fetch users activities', function (done) {
		//flowfact.config({debug: true});
		user.activities().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('activity');
			res.activity.should.be.an.Array;
			res.activity.length.should.be.above(0);
			activityId = res.activity[0].id
			done();
		});
	});

	it('should fetch activity details', function (done) {
		user.activities(activityId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(activityId);
			done();
		});
	});
});

describe('Inquiries', function() {

	var user = flowfact.users(demoUserId);
	var inquiryId = null;

	it('should fetch users inquiries', function (done) {
		//flowfact.config({debug: true});
		user.inquiries().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('inquiryshort');
			res.inquiryshort.should.be.an.Array;
			res.inquiryshort.length.should.be.above(0);
			inquiryId = res.inquiryshort[0].id
			done();
		});
	});

	it('should fetch inquiry details', function (done) {
		user.inquiries(inquiryId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(inquiryId);
			done();
		});
	});
});


describe('Offers', function() {

	var user = flowfact.users(demoUserId);
	var offerId = null;

	it('should fetch users offers', function (done) {
		//flowfact.config({debug: true});
		user.offers().get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.should.have.property('offershort');
			res.offershort.should.be.an.Array;
			res.offershort.length.should.be.above(0);
			offerId = res.offershort[0].id
			done();
		});
	});

	it('should fetch offer details', function (done) {
		user.offers(offerId).get(function (err, res) {
			if (err) return done(err);
			res.should.be.an.Object;
			res.id.should.equal(offerId);
			done();
		});
	});
});
