'use strict';
const round = (value, decimals) => Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);

module.exports = input => {
	if (typeof input !== 'number') {
		throw new TypeError('Expected a number');
	}

	const res = input - 273.15;

	return round(res, 2);
};
