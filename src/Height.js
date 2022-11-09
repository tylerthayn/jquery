/** Height - gets or sets the height of an element
* @memberof jQuery.
* @function Height
* @param {Element|jQuery} element
* @param {number} [height]
* @returns {Element|jQuery|number}
*/
$.extend({
	Height: function (e, v) {
		return $.Value(e, 'height', v)
	}
})

/** Height - gets or sets the height of an element
* @memberof jQuery#
* @function Height
* @param {number} [height]
* @returns {Element|jQuery|number}
*/
$.fn.extend({
	Height: function (v) {
		return $.Height(this, v)
	}
})


