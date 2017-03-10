'use strict';

let  assert = require('assert');
let nnStats = require('../');
let analyzer = nnStats.analyzer;
let tfAnalyzer = nnStats.tfAnalyzer;
let utils = nnStats.utils;
let model = require('./model.json');

describe('Test normal', function () {
	describe('Test analyzer', function () {
		describe('Test conv analysis', function () {
			it('Check output size 1', function() {
				let input = [7, 7, 3];
				let filter = [3, 3, 8];
				let stride = [1, 1];
				let padding = [0, 0];
				let expected = [5, 5, 8];

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check output size 2', function() {
				let input = [7, 7, 3];
				let filter = [3, 3, 8];
				let stride = [2, 2];
				let padding = [0, 0];
				let expected = [3, 3, 8];

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check input size of 2', function() {
				let input = [7, 7];
				let filter = [3, 3, 8];
				let stride = [2, 2];
				let padding = [0, 0];
				let expected = [3, 3, 8];

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check tride size of 2', function() {
				let input = [7, 7, 3];
				let filter = [3, 3, 8];
				let stride = [2, 2];
				let padding = [0, 0];
				let expected = [3, 3, 8];

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check padding size of 2', function() {
				let input = [7, 7, 3];
				let filter = [3, 3, 8];
				let stride = [2, 2];
				let padding = [0, 0];
				let expected = [3, 3, 8];

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check output size with padding', function() {
				let input = [5, 5, 3];
				let filter = [3, 3, 2];
				let stride = [2, 2];
				let padding = [1, 1];
				let expected = [3, 3, 2];

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);
				
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check weights', function() {
				let input = [227, 227, 3];
				let filter = [11, 11, 96];
				let stride = [4, 4];
				let padding = [0, 0];
				let expected = [55, 55, 96];
				let expectedWeights = 105705600;

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}

				assert(expectedWeights === res.weights);
			});

			it('Check reduced weights', function() {
				let input = [227, 227, 3];
				let filter = [11, 11, 96];
				let stride = [4, 4];
				let padding = [0, 0];
				let expected = [55, 55, 96];
				let expectedReducedWeights = 34944;

				let res = analyzer.analyzeConv(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}

				assert(expectedReducedWeights === res.reducedWeights);
			});

			it('Check reduced weights no bias', function() {
				let input = [227, 227, 3];
				let filter = [11, 11, 96];
				let stride = [4, 4];
				let padding = [0, 0];
				let expected = [55, 55, 96];
				let expectedReducedWeights = 34848;

				let res = analyzer.analyzeConv(input, filter, stride, padding, {'noBias': true});

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
				
				assert(expectedReducedWeights === res.reducedWeights);
			});
		});

		describe('Test pool analysis', function () {
			it('Check output size 1', function() {
				let input = [4, 4, 1];
				let filter = [2, 2];
				let stride = [2, 2];
				let expected = [2, 2, 1];

				let res = analyzer.analyzePool(input, filter, stride);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check output size 2', function() {
				let input = [224, 224, 64];
				let filter = [2, 2];
				let stride = [2, 2];
				let expected = [112, 112, 64];

				let res = analyzer.analyzePool(input, filter, stride);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check input size of 2', function() {
				let input = [4, 4];
				let filter = [2, 2];
				let stride = [2, 2];
				let expected = [2, 2, 1];

				let res = analyzer.analyzePool(input, filter, stride);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check tride size of 2', function() {
				let input = [4, 4, 1];
				let filter = [2, 2];
				let stride = [2, 2];
				let expected = [2, 2, 1];

				let res = analyzer.analyzePool(input, filter, stride);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check padding size of 2', function() {
				let input = [4, 4, 1];
				let filter = [2, 2];
				let stride = [2, 2];
				let padding = [0, 0];
				let expected = [2, 2, 1];

				let res = analyzer.analyzePool(input, filter, stride, padding);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});
		});

		describe('Test TF conv analysis', function () {
			it('Check output size 1', function() {
				let input = [28, 28, 1];
				let filter = [5, 5, 32];
				let stride = [1, 1];
				let padding = 'SAME';
				let expected = [28, 28, 32];

				let res = tfAnalyzer.analyzeConvTF(input, filter, stride, padding);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check output size 2', function() {
				let input = [14, 14, 32];
				let filter = [5, 5, 64];
				let stride = [1, 1];
				let padding = 'SAME';
				let expected = [14, 14, 64];

				let res = tfAnalyzer.analyzeConvTF(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});
		});

		describe('Test TF pool analysis', function () {
			it('Check output size 1: SAME padding', function() {
				let input = [28, 28, 32];
				let filter = [2, 2];
				let stride = [2, 2];
				let padding = 'SAME';
				let expected = [14, 14, 32];

				let res = tfAnalyzer.analyzePoolTF(input, filter, stride, padding);

				assert(expected.length === res.output.length);

				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check output size 2: SAME padding', function() {
				let input = [28, 28, 64];
				let filter = [4, 4];
				let stride = [4, 4];
				let padding = 'SAME';
				let expected = [7, 7, 64];

				let res = tfAnalyzer.analyzePoolTF(input, filter, stride, padding);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});

			it('Check output size 1: VALID padding', function() {
				let input = [13, 1, 1];
				let filter = [6, 1];
				let stride = [5, 1];
				let padding = 'VALID';
				let expected = [2, 1, 1];

				let res = tfAnalyzer.analyzePoolTF(input, filter, stride, padding);

				assert(expected.length === res.output.length);
				for (var i = 0; i < expected.length; i++) {
					assert(expected[i] === res.output[i])
				}
			});
		});

		describe('Test network analysis', function () {
			it('Check weights', function() {
				let input = [224, 224, 3];
				let expectedWeights = [
					1728, 36864, 0, 73728, 147456, 0, 294912, 589824, 589824, 0, 
					1179648, 2359296, 2359296, 0, 2359296, 2359296, 2359296, 0, 
					102760448, 16777216, 4096000
				];

				let res = analyzer.analyzeNetwork(model, input, {'noBias': true});

				assert(expectedWeights.length === res.layers.length);
				for (var i = 0; i < expectedWeights.length; i++) {
					assert(expectedWeights[i] === res.layers[i].reducedWeights)
				}
			});
		});
	})

	describe('Test utils', function () {
		describe('Test number conversion', function () {
			it('Check thousand', function() {
				let input = 1500;
				let expected = '1.50K';

				let res = utils.convertNumber(input);
				assert(res === expected);
			});

			it('Check million', function() {
				let input = 1500789;
				let expected = '1.50M';

				let res = utils.convertNumber(input);
				assert(res === expected);
			});

			it('Check billion', function() {
				let input = 1510000000;
				let expected = '1.51B';

				let res = utils.convertNumber(input);
				assert(res === expected);
			});

			it('Check set floating point', function() {
				let input = 1234500000;
				let expected = '1.234500B';

				let res = utils.convertNumber(input, 6);
				assert(res === expected);
			});
		});

		describe('Test data conversion', function () {
			it('Check KB', function() {
				let input = 1536;
				let expected = '1.50KB';

				let res = utils.convertData(input);
				assert(res === expected);
			});

			it('Check MB', function() {
				let input = 5872025;
				let expected = '5.60MB';

				let res = utils.convertData(input);
				assert(res === expected);
			});

			it('Check GB', function() {
				let input = 28089086115;
				let expected = '26.16GB';

				let res = utils.convertData(input);
				assert(res === expected);
			});

			it('Check set floating point', function() {
				let input = 28089086115;
				let expected = '26.1600GB';

				let res = utils.convertData(input, 4);
				assert(res === expected);
			});
		});
	})
});