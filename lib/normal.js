'use strict';

/**
 * Analyzer module.
 * @exports analyzer
 */

let tfAnalyzer = require('./tensorflow');
let errorCheck = require('./errorCheck');

/**
 * Calculate statistics for convolution layer
 * 
 * @param  {Array}	input - 2 or 3 dimension array ([height, width] or [height, width, channel])
 * @param  {Array}	filter - 3 dimension array ([height, width, out-channel])
 * @param  {Array}	strides - 2 dimension array ([height, width])
 * @param  {Array}	padding - 2 or 4 dimension array ([right, down] or [up, right, down, left])
 * @param  {Object} options
 * @return {Object}	statistics of the convolution layer
 *
 * @example
 * let input = [5, 5, 3];
 * let filter = [2, 2, 8];
 * let strides = [1, 1];
 * let padding = [0, 0];
 * let stats = analyzer.analyzeConv(input, filter, strides, padding);
 */
function analyzeConv(input, filter, strides, padding, options) {
	options = options || {};
	padding = padding || [0, 0];

	input = errorCheck.check2Or3DInput(input);
	filter = errorCheck.check3DFilter(filter);
	strides = errorCheck.check2Dstrides(strides);
	padding = errorCheck.check2DPadding(padding);

	let width = Math.floor((input[0] - filter[0] + 2 * padding[0]) / strides[0] + 1);
	let height = Math.floor((input[1] - filter[1] + 2 * padding[1]) / strides[1] + 1);
	let channel = filter[2];

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
 * @param  {Array}	strides - 2 dimension array ([height, width])
 * @param  {String}	padding - The padding algorithm. Either "VALID" or "SAME".
 * @param  {Object} options
 * @return {Object}	statistics of the pooling layer
 */
function analyzePool(input, filter, strides, padding, options) {
	options = options || {};
	padding = padding || [0, 0];

	input = errorCheck.check2Or3DInput(input);
	filter = errorCheck.check2DFilter(filter);
	strides = errorCheck.check2Dstrides(strides);
	padding = errorCheck.check2DPadding(padding);

	let width = Math.floor((input[0] - filter[0] + 2 * padding[0]) / strides[0] + 1);
	let height = Math.floor((input[1] - filter[1] + 2 * padding[1]) / strides[1] + 1);
	let channel = input[2];

	let output = [
		width,
		height,
		channel
	];

	let neurons = width * height * channel;

	return {
		output, 
		connectionsPerNeuron: 0, 
		neurons, 
		weights: 0
	}
}

/**
 * Calculate statistics for fully-connected layer.
 * 
 * @param  {Array or Number}	input - number of neurons in input layer.
 * @param  {Number}	hidden - number of neurons in hidden layer.
 * @return {Object} statistics
 */
function analyzeFC(input, hidden, options) {
	options = options || {};

	let weights;
	let neurons = hidden;
	
	if (input.constructor === Array) {
		input = errorCheck.check2Or3DInput(input);
		weights = input[0] * input[1] * input[2] * hidden;
	} else {
		weights = input * hidden;
	}

	let connectionsPerNeuron =  0;
	let output = hidden;

	return {
		output, connectionsPerNeuron, neurons, weights
	}
}

/**
 * Calculate statistics of a network
 * 
 * @param  {Object} networkJson - network's architecture in json format
 * @param  {Array}	input - 2 or 3 dimension array ([height, width] or [height, width, channel])
 * @param  {Object}	options
 * @return {Object}	statistics
 */
function analyzeNetwork(networkJson, input, options) {
	options = options || {};

	input = errorCheck.check2Or3DInput(input);

	let layers = [];
	let stat;
	let neurons = 0;
	let weights = 0;
	let memory = 0;
	let reducedWeights = 0;

	for (var i = 0; i < networkJson.length; i++) {
		let layer = networkJson[i];
		stat = {};

		if (layer.type === 'conv') {
			// If tensorflow flag is set, user TF analyzer instead
			if (options.tensorflow)
				stat = tfAnalyzer.analyzeConvTF(input, layer.filter, layer.strides, layer.padding, options);
			else
				stat = analyzeConv(input, layer.filter, layer.strides, layer.padding, options);
		} else if (layer.type === 'pool') {
			// If tensorflow flag is set, user TF analyzer instead
			if (options.tensorflow)
				stat = tfAnalyzer.analyzePoolTF(input, layer.filter, layer.strides, layer.padding, options);
			else
				stat = analyzePool(input, layer.filter, layer.strides, layer.padding, options);
		} else if (layer.type === 'fc') {
			stat = analyzeFC(input, layer.hidden, options);
		}

		if (layer.datasize > 0) {
			stat.memory = layer.datasize * stat.neurons;
			memory += stat.memory;
		}

		stat.datasize = layer.datasize;
		stat.type = layer.type;
		stat.name = layer.name || layer.type + (i + 1);
		neurons += stat.neurons;
		weights += stat.weights;

		if (stat.reducedWeights) {
			reducedWeights += stat.reducedWeights;
		} else {
			stat.reducedWeights = stat.weights;
			reducedWeights += stat.weights;
		}

		layers.push(stat);
		input = stat.output;
	}
	return {
		neurons,
		weights,
		reducedWeights,
		layers,
		memory,
		output: stat.output
	};
}

module.exports = {
	analyzeFC,
	analyzePool,
	analyzeConv,
	analyzeNetwork
};