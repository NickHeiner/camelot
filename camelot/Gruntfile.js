﻿'use strict';

module.exports = function (grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        sass: {
            dist: {
                files: {
                    'build/main.css': 'scss/*.scss'
                },
                options: {
                    includePaths: [
                        'node_modules/zurb-foundation/scss'
                    ]
                }
            }
        },

        jshint: {
            lib: {
                options: {
                    node: true,
                    globals: {
                        WinJS: true,
                        $: true,
                        Windows: true,
                        angular: true,
                        MSApp: true
                    }
                },
                files: {
                    src: [
                        'js/**/*.js',
                        'Gruntfile.js'
                    ]
                }
            }
        },

        browserify: {
            dist: {
                files: {
                    'build/build.js': ['js/**/*.js']
                }
            }
        }
    });

    grunt.registerTask('test', 'jshint');

    grunt.registerTask('build', [
        'browserify:dist',
        'sass:dist'
    ]);

    grunt.registerTask('default', ['test', 'build']);
};