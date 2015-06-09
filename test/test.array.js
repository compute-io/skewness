/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	skewness = require( './../lib/array.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'array skewness', function tests() {

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should compute the sample skewness', function test() {
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

	it( 'should return null if provided an empty array', function test() {
		assert.isNull( skewness( [] ) );
	});

});
