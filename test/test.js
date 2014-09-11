
// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	skewness = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-skewness', function tests() {
	'use strict';

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should throw an error if provided a non-array', function test() {
		var values = [
				'5',
				5,
				true,
				undefined,
				null,
				NaN,
				function(){},
				{}
			];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				skewness( value );
			};
		}
	});

	it( 'should compute the skewness', function test() {
		var scores = [ 61, 64, 67, 70, 73 ],
			freq = [ 5, 18, 42, 27, 8 ],
			idx = 0,
			data = [],
			expected;

		for ( var i = 0; i < scores.length; i++ ) {
			for ( var j = 0; j < freq[ i ]; j++ ) {
				data.push( scores[ i ] );
				idx += 1;
			}
		}
		expected = -0.1098;

		assert.closeTo( skewness( data ), expected, 0.001 );
	});

});