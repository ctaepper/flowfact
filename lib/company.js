module.exports = {
	getCompany: function () {
		return this._get('/company')
			.then(function (result) {
				return result.company;
			});
	},

	getCompanyQuota: function () {
		return this._get('/company/quota')
			.then(function (result) {
				return result.quota;
			});
	},

	getCompanyLogos: function () {
		return this._get('/company/logos')
			.then(function (result) {
				console.log(result);
				return result;
			});
	},

	getCompanyTermsAndConditions: function () {
		return this._get('/company/generaltermsandconditions')
			.then(function (result) {
				console.log(result);
				return result;
			});
	}
};
