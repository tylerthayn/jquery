
$.fn.extend({
	Clear: function () {
		$(this).each((i, e) => {
			$(e).find('.TemplateVariable').each((ii, ee) => {
				$(ee).text($(ee).data('default'))
			})
		})
	},
	Get: function (name) {
		if (Array.isArray(name)) {
			return name.map(n => $(this).Get(n))
		} else {
			return $(this).find(`.TemplateVariable[data-name="${name}"]`).text()
		}
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
	Variables: function () {
		return $(this).find('.TemplateVariable').map((i, e) => $(e).data('name')).toArray()
	}

})
