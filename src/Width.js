/**
* @module jQuery/Width
*/
define(['jquery', 'jQuery/Value'], ($, Value) => {

	/** Width - gets or sets the width of an element
	* @memberof module:jQuery/Width.
	* @function Width
	* @param {Element|jQuery} element
	* @param {number} [width]
	* @returns {Element|jQuery|number}
	*/
	function Width (e, v) {
		return Value(e, 'width', v)
	}

	/** Width - gets or sets the width of an element
	* @memberof jQuery.
	* @function Width
	* @param {Element|jQuery} element
	* @param {number} [width]
	* @returns {Element|jQuery|number}
	*/
	$.extend({Width: Width})

	/** Width - gets or sets the width of an element
	* @memberof jQuery#
	* @function Width
	* @param {number} [width]
	* @returns {Element|jQuery|number}
	*/
	$.fn.extend({Width: function (v) {return Width(this, v)}})

	return Width
})
