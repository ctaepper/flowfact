module.exports = {
	getEstates: function (userId, qs) {
		return this._get('/users/' + userId + '/estates', {qs: qs});
	},

	getEstate: function (userId, estateId) {
		return this._get('/users/' + userId + '/estates/' + estateId);
	}
};
