
$.extend({
	ActionHandlers: {
		Hide: function (effect, cb = () => {}) {
			$(this).hide(effect, () => {
				$(this).triggerHandler('hidden')
				cb()
			})
		},
		Show: function (effect, cb = () => {}) {
			$(this).show(effect, () => {
				$(this).triggerHandler('shown')
				cb()
			})
		},
		Toggle: function (effect, cb = () => {}) {
			$(this).toggle(effect, () => {
				$(this).triggerHandler(this.style.display && this.style.display == 'none' ? 'hidden' : 'shown')
				cb()
			})
		}
	}
})
