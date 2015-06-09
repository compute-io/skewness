/* global describe, it, require, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Matrix data structure:
	matrix = require( 'dstructs-matrix' ),

	// Module to be tested:
	skewness = require( './../lib/matrix.js' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'matrix skewness', function tests() {

	var data,
		mat;

	data = new Int8Array( [ 3, 0, 6, 7, 2, 5, 4, 3, 8, 4, 2, 1, 5, 3, 8, 9] );

	beforeEach( function before() {
		mat = matrix( data, [4,4], 'int8' );
	});

	it( 'should export a function', function test() {
		expect( skewness ).to.be.a( 'function' );
	});

	it( 'should compute the skewness along matrix columns', function test() {
		var out, skew, expected;

		out = matrix( [4,1], 'float32' );

		skew = skewness( out, mat );
		expected = '-0.7071067690849304;-1.5383701214958276e-16;1.2719026803970337;-0.36138370633125305';

		assert.strictEqual( skew.toString(), expected );

		skew = skewness( out, mat, 2 );
		expected = '-0.7071067690849304;-1.5383701214958276e-16;1.2719026803970337;-0.36138370633125305';

		assert.strictEqual( skew.toString(), expected );

		// Flip a matrix up-down:
		mat.strides[ 0 ] *= -1;
		mat.offset = mat.length + mat.strides[ 0 ];

		skew = skewness( out, mat );
		expected = '-0.36138370633125305;1.2719026803970337;-1.5383701214958276e-16;-0.7071067690849304';

		assert.strictEqual( skew.toString(), expected );
	});

	it( 'should compute the skewness along matrix rows', function test() {
		var out, mu, expected;

		out = matrix( [1,4], 'float32' );

		mu = skewness( out, mat, 1 );
		expected = '0.9658905863761902,-1.3308407068252563,0,1.0877919378206376e-16';

		assert.strictEqual( mu.toString(), expected );

		// Flip a matrix left-right:
		mat.strides[ 1 ] *= -1;
		mat.offset = mat.strides[ 0 ] - 1;

		mu = skewness( out, mat );
		expected = '-0.7071067690849304,0,1.2719026803970337,-0.36138370633125305';

		assert.strictEqual( mu.toString(), expected );
	});

	it( 'should return null if provided a matrix having one or more zero dimensions', function test() {
		var out, mat;

		out = matrix( [0,0] );

		mat = matrix( [0,10] );
		assert.isNull( skewness( out, mat ) );

		mat = matrix( [10,0] );
		assert.isNull( skewness( out, mat ) );

		mat = matrix( [0,0] );
		assert.isNull( skewness( out, mat ) );
	});

});
