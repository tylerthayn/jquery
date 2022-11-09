/** Width - gets or sets the width of an element
* @memberof jQuery.
* @function Width
* @param {Element|jQuery} element
* @param {number} [width]
* @returns {Element|jQuery|number}
*/
$.extend({
	Width: function Width (e, v) {
		return $.Value(e, 'width', v)
	}
})

/** Width - gets or sets the width of an element
* @memberof jQuery#
* @function Width
* @param {number} [width]
* @returns {Element|jQuery|number}
*/
$.fn.extend({
	Width: function (v) {
		return $.Width(this, v)
	}
})
