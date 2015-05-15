module.exports = {
	getEstates: function (userId) {
		return this._get('/users/' + userId + '/estates');
	},

	getEstate: function (userId, estateId) {
		return this._get('/users/' + userId + '/estates/' + estateId);
	}
};
