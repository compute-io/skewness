'use strict';

/**
* FUNCTION: skewness( arr, clbk )
*	Computes the sample skewness of an array of values.
*
* @param {Array} arr - array of values
* @param {Function} clbk - accessor function for accessing array values
* @returns {Number|Null} sample skewness or null
*/
function skewness( arr, clbk ) {

	var len = arr.length,
		delta = 0,
		delta_n = 0,
		term1 = 0,
		N = 0,
		mean = 0,
		M2 = 0,
		M3 = 0,
		g,
		i;

	if ( !len ) {
		return null;
	}

	for ( i = 0; i < len; i++ ) {
		N += 1;

		delta = clbk( arr[ i ], i ) - mean;
		delta_n = delta / N;

		term1 = delta * delta_n * (N-1);

		M3 += term1*delta_n*(N-2) - 3*delta_n*M2;
		M2 += term1;
		mean += delta_n;
	}
	// Calculate the population skewness:
	g = Math.sqrt( N )*M3 / Math.pow( M2, 3/2 );
	// Return the corrected sample skewness:
	return Math.sqrt( N*N-1)*g / (N-2);

} // end FUNCTION skewness()


// EXPORTS //

module.exports = skewness;
