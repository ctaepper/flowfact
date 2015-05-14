module.exports = {
	getEstates: function () {
		return this._get('/estates')
			.then(function (result) {
				console.log(result);
				return result;
			});
	}
};
