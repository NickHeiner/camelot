'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        jshint: {
            lib: {
                options: {
                    node: true,
                    globals: {
                        WinJS: true,
                        Windows: true
                    }
                },
                files: {
                    src: [
                        'js/default.js',
                        'Gruntfile.js'
                    ]
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'build/build.js': ['js/*.js']
                }
            }
        }
    });

    grunt.registerTask('test', 'jshint');
    grunt.registerTask('build', 'browserify');
    grunt.registerTask('default', ['test', 'build']);
};