define(['jquery', '@js/core'], ($) => {

	$.fn.extend({
		Clear: function () {
			$(this).each((i, e) => {
				$(e).find('.TemplateVariable').each((ii, ee) => {
					$(ee).text($(ee).data('default'))
				})
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
		Variables: function () {
			return $(this).find('.TemplateVariable').map((i, e) => $(e).data('name')).toArray()
		}
	})

})
