
let _remove = $.fn.remove

$.fn.extend({
	remove: function (...args) {
		$(this).each((i, e) => {
			while(Object.prototype.toString.call(e.previousSibling) == '[object Text]') {e.previousSibling.remove()}
			if (Object.prototype.toString.call(e.previousSibling) == '[object Comment]') {e.previousSibling.remove()}
			while(Object.prototype.toString.call(e.nextSibling) == '[object Text]') {e.nextSibling.remove()}
			if (Object.prototype.toString.call(e.nextSibling) == '[object Comment]') {e.nextSibling.remove()}
			_remove.call($(e), ...args)
		})
	}
})
