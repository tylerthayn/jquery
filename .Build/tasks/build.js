let $fs = require('fs-extra')
let $path = require('path')

let pre = `define(['jquery'], ($) => {\n\r\n\r`
let post = `\n\r\n\r\treturn $\n\r\n\r})\n\r`
let output = []

module.exports = function(grunt) {
	grunt.registerTask('build', 'Build package', function() {

		$fs.readdirSync('./src').forEach(entry => {
			if (entry.endsWith('.js')) {
				output.push('\t'+$fs.readFileSync('./src/'+entry, 'utf-8').replace(/\n/g, '\n\t'))
			}
		})

		$fs.writeFileSync('./index.js', pre + output.join('\n\r\n\r') + post + '\n', 'utf-8')

	})
}