/**
* @module jQuery/ValueOf
*/
define(['jquery'], ($) => {

	/** ValueOf
	* @memberof module:jQuery/ValueOf.
	* @function ValueOf
	* @param {string} value - css property value
	* @returns {float} value - css property value as float
	*/
	function ValueOf (v) {
		return parseFloat(v.replace(/px$/, ''))
	}

	/** ValueOf
	* @memberof jQuery.
	* @function ValueOf
	* @param {string} value - css property value
	* @returns {float} value - css property value as float
	*/
	$.extend({ValueOf: ValueOf})

	return ValueOf
})
