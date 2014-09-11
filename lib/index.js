/**
*
*	COMPUTE: skewness
*
*
*	DESCRIPTION:
*		- Computes the sample skewness of an array of values.
*
*
*	NOTES:
*		[1] The formula for corrected sample skewness comes from: Jones and Gill (1998). Comparing measures of sample skewness and kurtosis. The Statistician. DOI: 10.1111/1467-9884.00122
*
*
*	TODO:
*		[1] 
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2014. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2014.
*
*/

(function() {
	'use strict';

	/**
	* FUNCTION: skewness( arr )
	*	Computes the sample skewness of an array of values.
	*
	* @param {Array} arr - array of values
	* @returns {Number} sample skewness
	*/
	function skewness( arr ) {
		if ( !Array.isArray( arr ) ) {
			throw new TypeError( 'skewness()::invalid input argument. Must provide an array.' );
		}
		var len = arr.length,
			delta = 0,
			delta_n = 0,
			term1 = 0,
			N = 0,
			mean = 0,
			M2 = 0,
			M3 = 0,
			g;

		for ( var i = 0; i < len; i++ ) {
			N += 1;

			delta = arr[ i ] - mean;
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

})();