module.exports = {
	getCompany: function () {
		return this._get('/company');
	},

	getCompanyQuota: function () {
		return this._get('/company/quota');
	},

	getCompanyLogos: function () {
		return this._get('/company/logos');
	},

	getCompanyTermsAndConditions: function () {
		return this._get('/company/generaltermsandconditions');
	}
};
