
let dataFn = $.fn.data

/** data-change event
* @event jQuery#data-change
* @type {object}
* @property {string} name - data property name that changed
*/
$.fn.extend({

	/** Data
	* @fires jQuery#data-change
	*/
	data: function (key, value) {
		if (typeof key === 'undefined') {
			return dataFn.call($(this[0]))
		}
		if (typeof key === 'string' && typeof value === 'undefined') {
			return dataFn.call($(this[0]), key)
		}
		let ret = dataFn.call(this, key, value)
		if (typeof key === 'object') {
			this.trigger('data-change', key)
		} else if (typeof value !== 'undefined') {
			let d = {}
			d[key] = value
			this.trigger('data-change', d)
		}
		return ret
	}
})

