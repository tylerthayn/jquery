
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
