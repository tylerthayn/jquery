define(['jquery'], ($) => {


	$.extend({
		ActionHandlers: {
			Hide: function (effect, cb = () => {}) {
				if (this.style.display != 'none') {
					$(this).hide(effect, () => {
						$(this).triggerHandler('hidden')
						cb()
					})
				} else {
					cb()
				}
			},
			Show: function (effect, cb = () => {}) {
				if (this.style.display == 'none') {
					$(this).show(effect, () => {
						$(this).triggerHandler('shown')
						cb()
					})
				} else {
					cb()
				}
			},
			Toggle: function (effect, cb = () => {}) {
				$(this).toggle(effect, () => {
					$(this).triggerHandler(this.style.display && this.style.display == 'none' ? 'hidden' : 'shown')
					cb()
				})
			}
		}
	})
	


	/** ActionHandler Callback
	* @callback ActionHandler
	* @param {Event} event
	* @param {...*} [args]
	* @param {Function} [cb]
	*/
	$.fn.extend({
	
		/** Trigger Action for element
		* @memberof jQuery#
		* @function Action
		* @param {string} name - Name of action to trigger
		* @param {...*} [args] - Args to pass to action handler
		*/
		Action: function (name, ...args) {
			this.each((i, e) => {
				$(e).triggerHandler('action.'+name, args)
			})
		},
	
		/** Register ActionHandler for element
		* @memberof jQuery#
		* @function ActionHandler
		* @param {string} name - Action name to handle
		* @param {ActionHandler} fn - Handler function
		*/
		ActionHandler: function (name, fn) {
			this.each((i, e) => {
				$(e).on('action.'+name, {action: name}, (event, ...args) => {
					fn.call(e, ...args)
				})
			})
		}
	})
	


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
	
	
	

/** data-change event
	* @event jQuery#data-change
	* @type {object}
	* @property {string} name - data property name that changed
	*/
	$.fn.extend({
		/** Gets or Sets Element property
		* @memberof jQuery#
		* @function Property
		* @param {string|object} name - Property name or object of properties
		* @param {*|function} [value] - Property value.  If function, it is added as listener
		* @returns {*} [value] - Property value
		*/
		Property: function (name, value) {
			if (typeof name === 'string') {
				if (typeof value === 'undefined') {
					return this.data(name)
				} else if (value instanceof Function) {
					this.each((i, e) => {
						$(e).on('data-change', (event, data) => {
							if (Reflect.has(data, name)) {
								value.call(this, data[name], name)
							}
						})
					})
				} else {
					this.each((i, e) => {
						$(e).data(name, value)
					})
				}
			} else if (typeof name === 'object') {
				this.each((i, e) => {
					Object.keys(name).forEach(key => {
						$(e).data(key, name[key])
					})
				})
			}
		}
	
	})
	
	


	let _remove = $.fn.remove
	
	$.fn.extend({
		remove: function (...args) {
			$(this).each((i, e) => {
				while(Type(e.previousSibling, 'Text')) {e.previousSibling.remove()}
				if (Type(e.previousSibling, 'Comment')) {e.previousSibling.remove()}
				while(Type(e.nextSibling, 'Text')) {e.nextSibling.remove()}
				if (Type(e.nextSibling, 'Comment')) {e.nextSibling.remove()}
				_remove.call(e, ...args)
			})
		}
	})
	


	$.fn.extend({
		Clear: function () {
			$(this).each((i, e) => {
				$(e).find('.TemplateVariable').each((ii, ee) => {
					$(ee).data('value', $(ee).data('default'))
				})
			})
		},
		Get: function (name) {
			if (Array.isArray(name)) {
				return name.map(n => $(this).Get(n))
			} else {
				return $(this).find(`.TemplateVariable[data-name="${name}"]`).data('value')
			}
		},
		Set: function (name, value) {
			if (typeof name === 'object') {
				Object.keys(name).forEach(key => {
					$(this).Set(key, name[key])
				})
			} else {
				$(this).each((i, e) => {
					$(e).find(`.TemplateVariable[data-name="${name}"]`).data('value', value)
				})
			}
		},
		Variables: function () {
			return $(this).find('.TemplateVariable').map((i, e) => $(e).data('name')).toArray()
		}
	
	})
	

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
	

	return $

})