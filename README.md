Skewness
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> Computes the sample skewness of an array of values.


## Installation

``` bash
$ npm install compute-skewness
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

To use the module,

``` javascript
var skewness = require( 'compute-skewness' );
```


## Examples

``` javascript
var data = new Array( 100 );

for ( var i = 0; i < data.length; i++ ) {
	data[ i ] = Math.random();
}

console.log( skewness( data ) );
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

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

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


## License

[MIT license](http://opensource.org/licenses/MIT). 


---
## Copyright

Copyright &copy; 2014. Athan Reines.


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
