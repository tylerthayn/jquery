
module.exports = function(grunt) {
	grunt.initConfig({
		build: {},
		clean: {
			options: {
				paths: []
			}
		},
		jsdoc: {
			default: {
				//src: ["src/*.js", "src/**/*.js", "README.md"],
				src: ['src/*.js'],
				options: {
					"destination": "docs",
					"template": ".Build/templates/docs/template",
					"configure": "jsdoc.conf"
				}
			}
		},
/*
		minify: {
			lodash: {
				options: {
					src: 'src/lodash.js',
					file: 'src/lodash.min.js'
				}
			},
			options: {
				uglify: {
					compress: true,
					output: {
						quote_style: 1,
						comments: /@license/
					}
				}
			}
		},
*/
		readme: {
			options: {
				output: 'README.md',
				template: '.Build/templates/readme'
			}
		},
		rev: {}
	})

	grunt.loadTasks('.Build/tasks')
	grunt.loadNpmTasks('grunt-jsdoc')
/*
	grunt.registerTask('docs', ['jsdoc', 'readme'])
	grunt.registerTask('default', ['clean', 'concat', 'amd', 'docs'])
	grunt.registerTask('patch', ['rev:patch'])
	grunt.registerTask('minor', ['rev:minor'])
	grunt.registerTask('major', ['rev:major'])
*/
}
