# nnstats

[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]

> Javascript package for analyzing Neural Networks.

## Installation

```
  npm install --save nnstats
```

## Usage

### Basic usage

The following show basic usage for analyzing CNN in Tensorflow (`padding` takes either `SAME` or `VALID`).

```js
'use strict';


let nnStats = require('./');
let analyzer = nnStats.analyzer;
let utils = nnStats.utils;

let model = [{
	'type': 'conv',
	'filter': [5, 5, 32],
	'stride': [1, 1],
	'padding': 'SAME',
	'datasize': 4
},{
	'type': 'pool',
	'filter': [2, 2],
	'stride': [2, 2],
	'padding': 'SAME',
	'datasize': 4
},{
	'type': 'conv',
	'filter': [5, 5, 64],
	'stride': [2, 2],
	'padding': 'SAME',
	'datasize': 4
},{
	'type': 'pool',
	'filter': [2, 2],
	'stride': [2, 2],
	'padding': 'SAME',
	'datasize': 4
},{
	'type': 'fc',
	'hidden': 2048
},{
	'type': 'fc',
	'hidden': 1000
}]


let input = [28, 28, 1]
let options = {
	tensorflow: true
}

let stats = analyzer.analyzeNetwork(model, input, options);

utils.report(stats);
```

### Model layout

Currently, here are 3 supported layers type: convolution layer (`conv`), pooling layer (`pool`), and fully-connected layer ('fc'). In all cases, `type` field is required in layer object to identity layer type.

Fields in `conv` layer:

1. `filter`: 3D array kernal size (height, width, outChannel).
2. `stride`: 2D array stride size (height, width).
3. `padding`: 2D array padding size (height, width).
4. `datasize` (optional): number of byte of one value (for `float32`, this should be `4` because `32 / 8 = 4`). This value is used to calculate how much memory needed for the network.

Fields in `pool` layer:

1. `filter`: 2D array kernal size (height, width).
2. `stride`: 2D array stride size (height, width).
3. `padding`: 2D array padding size (height, width).
4. `datasize` (optional): number of byte of one value (for `float32`, this should be `4` because `32 / 8 = 4`). This value is used to calculate how much memory needed for the network.

Fields in `fc` layer:
1. `hidden`: number of neurons in hiddent layers.

## Created with
[Yeoman](https://npmjs.org/package/yo) and [Generator-simple-package](https://npmjs.org/package/generator-simple-package)

## License
MIT © [nghiattran](profile.nghiattran.com)

[npm-image]: https://badge.fury.io/js/nnstats.svg
[npm-url]: https://npmjs.org/package/nnstats
[travis-image]: https://travis-ci.org/nghiattran/nnstats.svg?branch=master
[travis-url]: https://travis-ci.org/nghiattran/nnstats
[daviddm-image]: https://david-dm.org/nghiattran/nnstats.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/nghiattran/nnstats
[coveralls-image]: https://coveralls.io/repos/nghiattran/nnstats/badge.svg
[coveralls-url]: https://coveralls.io/github/nghiattran/nnstats
