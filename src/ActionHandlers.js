
$.extend({

	/**
	* @memberof jQuery.
	* @static
	* @member {object} ActionHandlers
	*/
	ActionHandlers: {

		/**
		* @memberof jQuery.ActionHandlers.
		* @function Hide
		* @param {string|object} effect @see https://api.jqueryui.com/effect/#effect-options
		* @param {function} cb
		*/
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

		/**
		* @memberof jQuery.ActionHandlers.
		* @function Show
		* @param {string|object} effect @see https://api.jqueryui.com/effect/#effect-options
		* @param {function} cb
		*/
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

		/**
		* @memberof jQuery.ActionHandlers.
		* @function Toggle
		* @param {string|object} effect @see https://api.jqueryui.com/effect/#effect-options
		* @param {function} cb
		*/
		Toggle: function (effect, cb = () => {}) {
			$(this).toggle(effect, () => {
				$(this).triggerHandler(this.style.display && this.style.display == 'none' ? 'hidden' : 'shown')
				cb()
			})
		}
	}
})
