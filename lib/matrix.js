'use strict';

/**
* FUNCTION: skewness( out, mat[, dim] )
*	Computes the sample skewness of an array of values.
*
* @param {Matrix} out - output matrix
* @param {Matrix} mat - input matrix
* @param {Number} [dim=2] - matrix dimension along which to compute the skewness. If `dim=1`, compute along matrix rows. If `dim=2`, compute along matrix columns.
* @returns {Matrix|Null} skewness or null
*/
function skewness( out, mat, dim ) {
	var delta, delta_n,
		mean, term1,
		M, N, Nobs,
		s0, s1,
		o,
		i, j, k,
		M2, M3, g;

	if ( dim === 1 ) {
		// Compute along the rows...
		M = mat.shape[ 1 ];
		N = mat.shape[ 0 ];
		s0 = mat.strides[ 1 ];
		s1 = mat.strides[ 0 ];
	} else {
		// Compute along the columns...
		M = mat.shape[ 0 ];
		N = mat.shape[ 1 ];
		s0 = mat.strides[ 0 ];
		s1 = mat.strides[ 1 ];
	}
	if ( M === 0 || N === 0 ) {
		return null;
	}
	o = mat.offset;
	for ( i = 0; i < M; i++ ) {

		k = o + i*s0;
		delta = 0;
		delta_n = 0;
		term1 = 0;
		Nobs = 0;
		mean = 0;
		M2 = 0;
		M3 = 0;

		for ( j = 0; j < N; j++ ) {
			Nobs += 1;
			delta = mat.data[ k + j*s1 ] - mean;
			delta_n = delta / Nobs;
			term1 = delta * delta_n * (Nobs-1);

			M3 += term1*delta_n*(Nobs-2) - 3*delta_n*M2;
			M2 += term1;
			mean += delta_n;
		}

		// Calculate the population skewness:
		g = Math.sqrt( N )*M3 / Math.pow( M2, 3/2 );
		// Return the corrected sample skewness:
		out.data[ i ] = Math.sqrt( N*N-1 )*g / (N-2);
	}
	return out;
} // end FUNCTION skewness()


// EXPORTS //

module.exports = skewness;
