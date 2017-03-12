'use strict';

/**
 * Error checking functions.
 * @exports errorCheck
 * 
 * Check if input is in correct type.
 * @param  {Array}	input - 2 or 3 dimension array ([height, width] or [height, width, channel])
 * @return {Array}  input - 3d input array
 *
 * @throws Will throw an error if the input is not a 2D or 3D array.
 */
function check2Or3DInput(input) {
	if (input.length === 2) input.push(1);

	if (input.constructor !== Array || input.length !== 3) 
		throw Error('Input size must be 2 or 3 dimensional ([height, width] or [height, width, channel])');

	return input;
}

/**
 * Check if filter is in correct type.
 * @param  {Array}	filter - 2 dimension array ([height, width])
 * @return {Array}  filter - 2d filter array
 *
 * @throws Will throw an error if the filter is not a 2D array.
 */
function check2DFilter(filter) {
	if (filter.constructor !== Array || filter.length !== 2) 
		throw Error('Input size must be 2 dimensional ([height, width])');

	return filter
}

/**
 * Check if filter is in correct type.
 * @param  {Array}	filter - 3 dimension array ([height, width, out-channel])
 * @return {Array}  filter - 3d filter array
 *
 * @throws Will throw an error if the filter is not a 3D array.
 */
function check3DFilter(filter) {
	if (filter.constructor !== Array || filter.length !== 3) 
		throw Error('Filter size must be 3 dimensional ([height, width, out-channel])');

	return filter
}

/**
 * Check if stride is in correct type.
 * @param  {Array}	stride - 2 dimension array ([height, width])
 * @return {Array}  stride - 2d stride array
 *
 * @throws Will throw an error if the stride is not a 2D array.
 */
function check2DStride(stride) {
	if (stride.constructor !== Array || stride.length !== 2) 
		throw Error('Stride size must be 2 dimensional ([height, width])');

	return stride;
}

/**
 * Check if stride is in correct type.
 * @param  {Array}	stride - 2 dimension array ([height, width])
 * @return {Array}  stride - 4d stride array
 *
 * @throws Will throw an error if the stride is not a 2D array.
 */
function check4DStride(stride) {
	if (stride.constructor !== Array || stride.length !== 4) 
		throw Error('Stride size must be 4 dimensional.');

	return stride;
}


/**
 * Check if padding is in correct type.
 * @param  {Array}	padding - 2 or 4 dimensional ([right, down] or [up, right, down, left])
 * @return {Array}  padding - 4d padding array
 *
 * @throws Will throw an error if the padding is not a 2D array.
 */
function check2DPadding(padding) {
	if (padding.constructor !== Array || padding.length !== 2) 
		throw Error('Stride size must be 2 dimensional ([height, width])');

	return padding;
}

/**
 * Check if tensorflow-style padding is in correct type.
 * @param  {String}	padding - The padding algorithm. Either "VALID" or "SAME".
 * @return {Array}  padding - Either "VALID" or "SAME".
 *
 * @throws Will throw an error if the padding is not either "SAME" or "VALID".
 */
function checkTFPadding(padding) {
	if (padding.constructor !== String || !(padding === 'SAME' || padding === 'VALID')) 
		throw Error('Padding value must be "SAME" or "VALID".');

	return padding;
}

module.exports = {
	check3DFilter,
	check2DFilter,
	check2DPadding,
	checkTFPadding,
	check2DStride,
	check4DStride,
	check2Or3DInput
}