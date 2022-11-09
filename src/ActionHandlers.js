
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
