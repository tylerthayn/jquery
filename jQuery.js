/*
define([
	'jquery',
	'@js/jQuery/Action',
	'@js/jQuery/ActionHandler',
	'@js/jQuery/ActionHandlers',
	'@js/jQuery/Data',
	'@js/jQuery/Height',
	'@js/jQuery/Property',
	'@js/jQuery/Remove',
	'@js/jQuery/Template',
	'@js/jQuery/Value',
	'@js/jQuery/ValueOf',
	'@js/jQuery/Width'
], ($, Action, ActionHandler, ActionHandlers, Data, Height, Property, Remove, Template, Value, ValueOf, Width) => {
*/
define(['jquery'], ($) => {
	let _remove = $.fn.remove
	let dataFn = $.fn.data


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
		},

		/** Height - gets or sets the height of an element
		* @memberof jQuery.
		* @function Height
		* @param {Element|jQuery} element
		* @param {number} [height]
		* @returns {Element|jQuery|number}
		*/
		Height: function (e, v) {
			return Value(e, 'height', v)
		},

		/** Value
		* @memberof jQuery.
		* @function Value
		* @param {Element|jQuery} e
		* @param {string} name - css property name
		* @param {*} [value] - css property value
		* @returns {*} value - css property value or the element
		*/
		Value: function (e, name, v) {
			if (e instanceof Element) {
				if (typeof v === 'undefined' || v === null) {
					return ValueOf($(e).css(name))
				} else {
					$(e).css(name, `${v}px`)
					return e
				}
			} else if (e instanceof $) {
				if (typeof v === 'undefined' || v === null) {
					return ValueOf($(e[0]).css(name))
				} else {
					e.css(name, `${v}px`)
					return e
				}
			}
		},

		/** ValueOf
		* @memberof jQuery.
		* @function ValueOf
		* @param {string} value - css property value
		* @returns {float} value - css property value as float
		*/
		ValueOf: function (v) {
			return parseFloat(v.replace(/px$/, ''))
		},

		/** Width - gets or sets the width of an element
		* @memberof jQuery.
		* @function Width
		* @param {Element|jQuery} element
		* @param {number} [width]
		* @returns {Element|jQuery|number}
		*/
		Width: function Width (e, v) {
			return Value(e, 'width', v)
		}

	})


	$.fn.extend({
		Action: function (name, ...args) {
			this.each((i, e) => {
				$(e).triggerHandler('action.'+name, args)
			})
		},
		ActionHandler: function (name, fn) {
			this.each((i, e) => {
				$(e).on('action.'+name, {action: name}, (event, ...args) => {
					fn.call(e, ...args)
				})
			})
		},
		Clear: function () {
			$(this).each((i, e) => {
				$(e).find('.TemplateVariable').each((ii, ee) => {
					$(ee).text($(ee).data('default'))
				})
			})
		},
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
		},
		Get: function (name) {
			if (Array.isArray(name)) {
				return name.map(n => $(this).Get(n))
			} else {
				return $(this).find(`.TemplateVariable[data-name="${name}"]`).text()
			}
		},

		/** Height - gets or sets the height of an element
		* @memberof jQuery#
		* @function Height
		* @param {number} [height]
		* @returns {Element|jQuery|number}
		*/
		Height: function (v) {
			return Height(this, v)
		},
		Property: function (name, value) {
			if (typeof name === 'string') {
				if (typeof value === 'undefined') {
					return this.data(name)
				} else if (value instanceof Function) {
					this.each((i, e) => {
						//Data(e)
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
		},
		remove: function (...args) {
			$(this).each((i, e) => {
				while(Object.prototype.toString.call(e.previousSibling) == '[object Text]') {e.previousSibling.remove()}
				if (Object.prototype.toString.call(e.previousSibling) == '[object Comment]') {e.previousSibling.remove()}
				while(Object.prototype.toString.call(e.nextSibling) == '[object Text]') {e.nextSibling.remove()}
				if (Object.prototype.toString.call(e.nextSibling) == '[object Comment]') {e.nextSibling.remove()}
				_remove.call($(e), ...args)
			})
		},
		Set: function (name, value) {
			if (typeof name === 'object') {
				Object.keys(name).forEach(key => {
					$(this).Set(key, name[key])
				})
			} else {
				$(this).each((i, e) => {
					$(e).find(`.TemplateVariable[data-name="${name}"]`).text(value)
				})
			}
		},

		/** Value
		* @memberof jQuery#
		* @function Value
		* @param {string} name - css property name
		* @param {*} [value] - css property value
		* @returns {*} value - css property value or the element
		*/
		Value: function (name, v) {
			return Value(this, name, v)
		},

		Variables: function () {
			return $(this).find('.TemplateVariable').map((i, e) => $(e).data('name')).toArray()
		},

		/** Width - gets or sets the width of an element
		* @memberof jQuery#
		* @function Width
		* @param {number} [width]
		* @returns {Element|jQuery|number}
		*/
		Width: function (v) {
			return Width(this, v)
		}
	})

})
