
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
