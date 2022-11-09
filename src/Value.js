/** Value
* @memberof jQuery.
* @function Value
* @param {Element|jQuery} e
* @param {string} name - css property name
* @param {*} [value] - css property value
* @returns {*} value - css property value or the element
*/
$.extend({
	Value: function (e, name, v) {
		if (e instanceof Element) {
			if (typeof v === 'undefined' || v === null) {
				return $,ValueOf($(e).css(name))
			} else {
				$(e).css(name, `${v}px`)
				return e
			}
		} else if (e instanceof $) {
			if (typeof v === 'undefined' || v === null) {
				return $.ValueOf($(e[0]).css(name))
			} else {
				e.css(name, `${v}px`)
				return e
			}
		}
	}
})

/** Value
* @memberof jQuery#
* @function Value
* @param {string} name - css property name
* @param {*} [value] - css property value
* @returns {*} value - css property value or the element
*/
$.fn.extend({
	Value: function (name, v) {
		return $.Value(this, name, v)
	}
})
