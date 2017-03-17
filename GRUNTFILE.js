module.exports = function(grunt) {
    'use strict';
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        less: {
            development: {
                files: {
                    "styles/style.css": "less/style.less"
                }, options: {
                    compress: true,
                    cleancss: true,
                    sourceMap: false,
                    //sourceMapFilename: "style.css.map"
                }
            }
        },

        watch: {
            configFiles: {
                files: [ 'GRUNTFILE.js' ], //tasks: ['newer:jshint:all'],
                options: {
                    reload: true
                }
            },

            less: {
                files: [
                    'less/*.less',
                ],
                tasks: [
                    'less'
                ]
            }
        }
    });
    grunt.registerTask('default', [ 'watch' ]);
};
