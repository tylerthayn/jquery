
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
