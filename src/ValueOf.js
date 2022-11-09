/** ValueOf
* @memberof jQuery.
* @function ValueOf
* @param {string} value - css property value
* @returns {float} value - css property value as float
*/
$.extend({
	ValueOf: function (v) {
		return parseFloat(v.replace(/px$/, ''))
	}
})

