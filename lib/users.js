module.exports = {
	getUsers: function () {
		return this._get('/users')
			.then(function (res) {
				return res.user;
			});
	},

	getUser: function (id) {
		return this._get('/users/' + id);
	},

	getUserContacts: function (id) {
		return this._get('/users/' + id + '/contacts');
	},

	getUserActivities: function (id) {
		return this._get('/users/' + id + '/activities');
	},

	getUserEstates: function (id) {
		return this._get('/users/' + id + '/estates');
	}
};
