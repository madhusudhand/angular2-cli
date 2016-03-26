/**
 * Module errors
 * @type {Object}
 */
module.exports = {
	cantFindNpm: function ( consoleOutputFrom_npm_v ) {
		return new Error(
			'Couldn\'t install dependencies because `npm` could not be found.  ' +
			'(Is it in your $PATH?)'
		);
	}
};
