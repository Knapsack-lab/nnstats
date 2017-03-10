'use strict';

/**
 * Utility functions.
 * @exports utils
 * 
 * @param  {Number}	datasize - size of data needs to be converted
 * @param  {Number}	floatpoint - number of floating points kept
 * @return {String}	string representation of given data
 */

function convertData(datasize, floatpoint) {
	floatpoint = floatpoint || 2;

	let size = datasize, datatype;
	if (datasize < 1024) {
		datatype = 'B';
	} else if (datasize < Math.pow(1024, 2)) {
		size = datasize / 1024;
		datatype = 'KB';
	} else if (datasize < Math.pow(1024, 3)) {
		size = datasize / Math.pow(1024, 2);
		datatype = 'MB';
	} else if (datasize < Math.pow(1024, 4)) {
		size = datasize / Math.pow(1024, 3);
		datatype = 'GB';
	}
	return size.toFixed(floatpoint) + datatype;
}

/**
 * @param  {Number}	number - the number needs to be converted
 * @param  {Number}	floatpoint - number of floating points kept
 * @return {String}	string representation of given number
 */
function convertNumber(number, floatpoint) {
	floatpoint = floatpoint || 2;

	let size = number, datatype;
	if (number < 1000) {
		datatype = '';
	} else if (number < Math.pow(1000, 2)) {
		size = number / 1000;
		datatype = 'K';
	} else if (number < Math.pow(1000, 3)) {
		size = number / Math.pow(1000, 2);
		datatype = 'M';
	} else if (number < Math.pow(1000, 4)) {
		size = number / Math.pow(1000, 3);
		datatype = 'B';
	}

	return size.toFixed(floatpoint) + datatype;
}

/**
 * Print statistics report
 * 
 * @param  {Object}	stats
 * @param  {Object}
 */
function report(stats, options) {
	options = options || {};

	for (var i = 0; i < stats.layers.length; i++) {
		let layer = stats.layers[i];

		let neurons  = convertNumber(layer.neurons);
		let weights = convertNumber(layer.weights);

		console.log('Layer name:', layer.name);
		console.log('	Type:', layer.type);
		console.log('	Output shape:', layer.output);
		console.log('	Number of neurons:', layer.neurons, '(', neurons, ')');
		console.log('	Number of connections:', layer.weights, '(', weights, ')');
		if (layer.reducedWeights) {
			let reducedWeights = convertNumber(layer.reducedWeights);
			console.log('	Number of reduced connections:', layer.reducedWeights, '(', reducedWeights, ')');
		}

		if (layer.memory) {
			console.log('	Memory:', convertData(layer.memory));
		}
	}

	let neurons  = convertNumber(stats.neurons);
	let weights = convertNumber(stats.weights);
	let reducedWeights = convertNumber(stats.reducedWeights);
	console.log('Total:');
	console.log('	', stats.neurons, '(', neurons, ')', 'neurons');
	console.log('	', stats.weights, '(', weights, ')', 'connections');
	console.log('	', stats.reducedWeights, '(', reducedWeights, ')', 'reduced connections');
	if (stats.memory > 0) {
		console.log('	 Memory:', convertData(stats.memory));
	}
}

module.exports = {
	convertData, convertNumber, report
}