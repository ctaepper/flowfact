module.exports = {
	getUsers: function () {
		return this._get('/users')
			.then(function (result) {
				return result.users.user;
			});
	},

	getUser: function (id) {
		return this._get('/users/' + id)
			.then(function (result) {
				return result.user;
			});
	},

	getUserContacts: function (id) {
		return this._get('/users/' + id + '/contacts')
			.then(function (result) {
				return result.contacts;
			});
	},

	getUserActivities: function (id) {
		return this._get('/users/' + id + '/activities')
			.then(function (result) {
				return result.activities;
			});
	},

	getUserEstates: function (id) {
		return this._get('/users/' + id + '/estates')
			.then(function (result) {
				return result.estates;
			});
	}
};
