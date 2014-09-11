var skewness = require( './../lib' );

var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

console.log( skewness( data ) );