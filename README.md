Skewness
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample [skewness](http://en.wikipedia.org/wiki/Skewness).


## Installation

``` bash
$ npm install compute-skewness
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var skewness = require( 'compute-skewness' );
```

#### skewness( x[, opts] )

Computes the [skewness](http://en.wikipedia.org/wiki/Skewness). `x` may be either an [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix).

``` javascript
var data, skew;

data = [ 2, 4, 5, 3, 8, 2 ];
skew = skewness( data );
// returns approx 1.312

data = new Int8Array( data );
skew = skewness( data );
// returns approx 1.312
```

For non-numeric `arrays`, provide an accessor `function` for accessing `array` values.

``` javascript
var data = [
	{'x':2},
	{'x':4},
	{'x':5},
	{'x':3},
	{'x':8},
	{'x':2}
];

function getValue( d, i ) {
	return d.x;
}

var skew = skewness( data, {
	'accessor': getValue
});
// returns approx 1.312
```

If provided a [`matrix`](https://github.com/dstructs/matrix), the function accepts the following `options`:

*	__dim__: dimension along which to compute the [skewness](http://en.wikipedia.org/wiki/Skewness). Default: `2` (along the columns).
*	__dtype__: output [`matrix`](https://github.com/dstructs/matrix) data type. Default: `float64`.

By default, the function computes the [skewness](http://en.wikipedia.org/wiki/Skewness) along the columns (`dim=2`).

``` javascript
var matrix = require( 'dstructs-matrix' ),
	data,
	mat,
	skew,
	i;

data = 	data = new Int8Array( [ 3, 0, 6, 7, 2, 5, 4, 3, 8, 4, 2, 1, 5, 3, 8, 9] );
mat = matrix( data, [4,4], 'int8' );
/*
	[  3 0 6 7
	   2 5 4 3
	   8 4 2 1
	   5 3 8 9 ]
*/

skew = skewness( mat );
/*
	[  -0.707
	   0
	   1.272
	   -0.361 ]
*/
```

To compute the [skewness](http://en.wikipedia.org/wiki/Skewness) along the rows, set the `dim` option to `1`.

``` javascript
skew = skewness( mat, {
	'dim': 1
});
/*
	[ 0.966, -1.331, 0, 0 ]
*/
```

By default, the output [`matrix`](https://github.com/dstructs/matrix) data type is `float64`. To specify a different output data type, set the `dtype` option.

``` javascript
skew = skewness( mat, {
	'dim': 1,
	'dtype': 'uint8'
});
/*
	[ 10, 11, 12, 13, 14 ]
*/

var dtype = skew.dtype;
// returns 'uint8'
```

If provided a [`matrix`](https://github.com/dstructs/matrix) having either dimension equal to `1`, the function treats the [`matrix`](https://github.com/dstructs/matrix) as a [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays) and returns a `numeric` value.

``` javascript
data = [ 2, 4, 5, 3, 8, 2 ];

// Row vector:
mat = matrix( new Int8Array( data ), [1,6], 'int8' );
skew = skewness( mat );
// returns approx 1.312

// Column vector:
mat = matrix( new Int8Array( data ), [6,1], 'int8' );
skew = skewness( mat );
// returns  approx 1.312
```

If provided an empty [`array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array), [`typed array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays), or [`matrix`](https://github.com/dstructs/matrix), the function returns `null`.

``` javascript
skew = skewness( [] );
// returns null

skew = skewness( new Int8Array( [] ) );
// returns null

skew = skewness( matrix( [0,0] ) );
// returns null

skew = skewness( matrix( [0,10] ) );
// returns null

skew = skewness( matrix( [10,0] ) );
// returns null
```

## Examples

``` javascript
var matrix = require( 'dstructs-matrix' ),
	skewness = require( 'compute-skewness' );

var data,
	mat,
	skew,
	i;

// Plain arrays...
data = new Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
skew = skewness( data );

// Object arrays (accessors)...
function getValue( d ) {
	return d.x;
}
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = { 'x': data[ i ] };
}
skew = skewness( data, {
	'accessor': getValue
});

// Typed arrays...
data = new Int32Array( 1000 );
for ( i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random() * 100;
}
skew = skewness( data );

// Matrices (along rows)...
mat = matrix( data, [100,10], 'int32' );
skew = skewness( mat, {
	'dim': 1
});

// Matrices (along columns)...
skew = skewness( mat, {
	'dim': 2
});

// Matrices (custom output data type)...
skew = skewness( mat, {
	'dtype': 'uint8'
});
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


## Notes

The formula for computing the sample skewness comes from

> Jones and Gill (1998). Comparing measures of sample skewness and kurtosis. _The Statistician_. [DOI: 10.1111/1467-9884.00122](http://onlinelibrary.wiley.com/doi/10.1111/1467-9884.00122/)

The test data comes from [Measures of Shape: Skewness and Kurtosis](http://www.tc3.edu/instruct/sbrown/stat/shape.htm) by Stan Brown.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ open reports/coverage/lcov-report/index.html
```


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2014-2015. The [Compute.io](https://github.com/compute-io) Authors.

[npm-image]: http://img.shields.io/npm/v/compute-skewness.svg
[npm-url]: https://npmjs.org/package/compute-skewness

[travis-image]: http://img.shields.io/travis/compute-io/skewness/master.svg
[travis-url]: https://travis-ci.org/compute-io/skewness

[coveralls-image]: https://img.shields.io/coveralls/compute-io/skewness/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/skewness?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/skewness.svg
[dependencies-url]: https://david-dm.org/compute-io/skewness

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/skewness.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/skewness

[github-issues-image]: http://img.shields.io/github/issues/compute-io/skewness.svg
[github-issues-url]: https://github.com/compute-io/skewness/issues
