/* global describe, it, require */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	skewness = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-skewness', function tests() {

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should throw an error if the first argument is neither array-like or matrix-like', function test() {
		var values = [
			// '5', // valid as is array-like (length)
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

	it( 'should throw an error if provided a dimension which is greater than 2 when provided a matrix', function test() {
		var values = [
			'5',
			5,
			true,
			undefined,
			null,
			NaN,
			[],
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				skewness( matrix( [2,2] ), {
					'dim': value
				});
			};
		}
	});

	it( 'should throw an error if provided an unrecognized/unsupported data type option', function test() {
		var values = [
			'beep',
			'boop'
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( Error );
		}
		function badValue( value ) {
			return function() {
				skewness( matrix( [2,2] ), {
					'dtype': value
				});
			};
		}
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

	it( 'should compute the skewness of a typed array', function test() {
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

	it( 'should compute the skewness using an accessor function', function test() {
		var scores = [ 61, 64, 67, 70, 73 ],
			freq = [ 5, 18, 42, 27, 8 ],
			idx = 0,
			data = [],
			expected;

		for ( var i = 0; i < scores.length; i++ ) {
			for ( var j = 0; j < freq[ i ]; j++ ) {
				data.push( {'x': scores[ i ]} );
				idx += 1;
			}
		}
		expected = -0.1098;

		assert.closeTo( skewness( data, {
			'accessor': getValue
		}), expected, 0.001 );

		function getValue( d ) {
			return d.x;
		}
	});

	it( 'should compute the sample skewness along a matrix dimension', function test() {
		var expected,
			data,
			mat,
			skew;

		data = data = new Int8Array( [ 3, 0, 6, 7, 2, 5, 4, 3, 8, 4, 2, 1, 5, 3, 8, 9] );
		mat = matrix( data, [4,4], 'int8' );

		// Default:
		skew = skewness( mat );
		expected = '-0.7071067811865475;-1.5383701491068512e-16;1.2719027086887789;-0.36138369988040164';

		assert.strictEqual( skew.toString(), expected, 'default' );

		// Along columns:
		skew = skewness( mat, {
			'dim': 2
		});
		expected = '-0.7071067811865475;-1.5383701491068512e-16;1.2719027086887789;-0.36138369988040164';

		assert.strictEqual( skew.toString(), expected, 'dim: 2' );

		// Along rows:
		skew = skewness( mat, {
			'dim': 1
		});
		expected = '0.96589057683259,-1.330840721588826,0,1.0877919644084146e-16';

		assert.strictEqual( skew.toString(), expected, 'dim: 1' );
	});

	it( 'should compute the sample skewness of 1d matrices (vectors)', function test() {
		var data = [], mat, expected;

		var scores = [ 61, 64, 67, 70, 73 ],
			freq = [ 5, 18, 42, 27, 8 ],
			idx = 0;

		for ( var i = 0; i < scores.length; i++ ) {
			for ( var j = 0; j < freq[ i ]; j++ ) {
				data.push( scores[ i ] );
				idx += 1;
			}
		}
		expected = -0.1098;

		// Row vector:
		mat = matrix( data, [1,idx], 'int8' );
		assert.closeTo( skewness( mat ), expected, 0.001 );

		// Column vector:
		mat = matrix( data, [idx,1], 'int8' );
		assert.closeTo( skewness( mat ), expected, 0.001 );
	});

});
