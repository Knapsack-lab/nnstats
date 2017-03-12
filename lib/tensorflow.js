'use strict';

/**
 * Tensorflow-style analyzer.
 * @exports tfAnalyzer
 */

let errorCheck = require('./errorCheck');

/**
 * Calculate statistics for convolution layer. Check {@link https://www.tensorflow.org/api_guides/python/nn link} for how to calculate output size.
 * 
 * @param  {Array}	input - 2 or 3 dimension array ([height, width] or [height, width, channel])
 * @param  {Array}	filter - 3 dimension array ([height, width, out-channel])
 * @param  {Array}	stride - 2 dimension array ([height, width])
 * @param  {String}	padding - The padding algorithm. Either "VALID" or "SAME".
 * @param  {Object} options
 * @return {Object}	statistics of the convolution layer
 */
function analyzeConvTF(input, filter, stride, padding, options) {
	options = options || {};

	input = errorCheck.check2Or3DInput(input);
	filter = errorCheck.check3DFilter(filter);
	stride = errorCheck.check4DStride(stride);
	padding = errorCheck.checkTFPadding(padding);

	let width = 0
	let height = 0;
	let channel = filter[2];

	if (padding === 'VALID') {
		width = Math.ceil((input[0] - filter[0] + 1) / stride[1]);
		height = Math.ceil((input[1] - filter[1] + 1) / stride[2]);
	} else {
		width = Math.ceil(input[0] / stride[1]);
		height = Math.ceil(input[1] / stride[2]);
	}

	let output = [
		width,
		height,
		channel
	];

	let connectionsPerNeuron =  filter[0] * filter[1] * input[2] + 1;
	let reducedWeights = channel * filter[0] * filter[1] * input[2] + channel;

	if (options['noBias'] === true) {
		connectionsPerNeuron -= 1;
		reducedWeights -= channel;
	}

	let neurons = width * height * channel;
	let weights = neurons * connectionsPerNeuron;

	return {
		output, connectionsPerNeuron, neurons, weights, reducedWeights
	}
}

/**
 * Calculate statistics for pooling layer
 * 
 * @param  {Array}	input - 2 or 3 dimension array ([height, width] or [height, width, channel])
 * @param  {Array}	filter - 2 dimension array ([height, width])
 * @param  {Array}	stride - 2 dimension array ([height, width])
 * @param  {String}	padding - The padding algorithm. Either "VALID" or "SAME".
 * @param  {Object} options
 * @return {Object}	statistics of the pooling layer
 */
function analyzePoolTF(input, filter, stride, padding, options) {
	options = options || {};
	padding = padding || [0, 0, 0, 0];

	input = errorCheck.check2Or3DInput(input);
	filter = errorCheck.check2DFilter(filter);
	stride = errorCheck.check4DStride(stride);
	padding = errorCheck.checkTFPadding(padding);

	let width = 0
	let height = 0;
	let channel = input[2];
	let pad = {
		top: 0,
		bottom: 0,
		right: 0,
		left: 0
	};

	if (padding === 'VALID') {
		width = Math.ceil((input[0] - filter[0] + 1) / stride[1]);
		height = Math.ceil((input[1] - filter[1] + 1) / stride[2]);
	} else {
		width = Math.ceil(input[0] / stride[1]);
		height = Math.ceil(input[1] / stride[2]);

		let padAlongHeight = Math.max((height - 1) * stride[1] + filter[0] - input[0], 0);
		let padAlongWidth = Math.max((width - 1) * stride[2] + filter[1] - input[1], 0);

		pad = getPaddings(input, filter, stride);
	}

	let output = [
		width,
		height,
		channel
	];

	let neurons = width * height * channel;

	return {
		output, 
		neurons, 
		pad,
		connectionsPerNeuron: 0,
		weights: 0
	}
}

/**
 * Calculate paddings for "SAME". Reference at https://www.tensorflow.org/api_guides/python/nn
 * 
 * @param  {Array}	input - 2 or 3 dimension array ([height, width] or [height, width, channel])
 * @param  {Array}	filter - 2 dimension array ([height, width])
 * @param  {Array}	stride - 2 dimension array ([height, width])
 * @return {Object}	statistics of the convolution layer
 */
function getPaddings(input, filter, stride) {
	input = errorCheck.check2Or3DInput(input);
	filter = errorCheck.check2DFilter(filter);
	stride = errorCheck.check4DStride(stride);

	let outWidth = Math.ceil(input[0] / stride[1]);
	let outHeight = Math.ceil(input[1] / stride[2]);

	let padAlongHeight = Math.max((outHeight - 1) * stride[1] + filter[0] - input[0], 0);
	let padAlongWidth = Math.max((outWidth - 1) * stride[2] + filter[1] - input[1], 0);

	let pad = {};
	pad.top = Math.floor(padAlongHeight / 2);
	pad.bottom= padAlongHeight - pad.top;
	pad.left = Math.floor(padAlongWidth / 2);
	pad.right = padAlongWidth - pad.left;

	return pad;
}


module.exports = {
	analyzePoolTF,
	analyzeConvTF,
};