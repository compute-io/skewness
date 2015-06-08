'use strict';

var matrix = require( 'dstructs-matrix' ),
	skewness = require( './../lib' );

var data,
	mat,
	skew,
	i;


// ----
// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
skew = skewness( data );
console.log( 'Arrays: %d\n', skew );


// ----
// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = {
		'x': data[ i ]
	};
}
skew = skewness( data, {
	'accessor': getValue
});
console.log( 'Accessors: %d\n', skew );


// ----
// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
skew = skewness( data );
console.log( 'Typed arrays: %d\n', skew );


// ----
// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
skew = skewness( mat, {
	'dim': 1
});
console.log( 'Matrix (rows): %s\n', skew.toString() );


// ----
// Matrices (along columns)...
skew = skewness( mat, {
	'dim': 2
});
console.log( 'Matrix (columns): %s\n', skew.toString() );


// ----
// Matrices (custom output data type)...
skew = skewness( mat, {
	'dtype': 'uint8'
});
console.log( 'Matrix (%s): %s\n', skew.dtype, skew.toString() );
