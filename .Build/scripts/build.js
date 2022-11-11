let $fs = require('fs-extra')
let $path = require('path')

let pre = `define(['jquery'], ($) => {\n\r\n\r`
let post = `\n\r\n\r\treturn $\n\r\n\r})\n\r`
let output = []

$fs.readdirSync('./src').forEach(entry => {
	if (entry.endsWith('.js')) {
		output.push($fs.readFileSync('./src/'+entry, 'utf-8').replace(/\n/g, '\n\t'))
	}
})


$fs.writeFileSync('./index.js', pre + output.join('\n\r\n\r') + post, 'utf-8')

