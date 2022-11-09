let $fs = require('fs-extra')
let $path = require('path')

let pre = `define(['jquery'], ($) => {\n\n`
let post = `\n\n\treturn $\n\n})`
let output = []

$fs.readdirSync('./src').forEach(entry => {
	if (entry.endsWith('.js')) {
		output.push($fs.readFileSync('./src/'+entry, 'utf-8').replace(/\n/g, '\n\t'))
	}
})


$fs.writeFileSync('./index.js', pre + output.join('\n\n') + post, 'utf-8')

