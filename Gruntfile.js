/*!
 * dyCalendar is a JavaScript library for creating Calendar.
 *
 * Author: Yusuf Shakeel
 * https://github.com/yusufshakeel
 *
 * GitHub Link: https://github.com/yusufshakeel/dyCalendarJS
 *
 * MIT license
 * Copyright (c) 2016 Yusuf Shakeel
 *
 * Date: 2014-08-17 sunday
 */
module.exports = function(grunt) {

    // project configurations
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        cssmin : {
            target : {
                src : ["css/dycalendar.css"],
                dest : "css/dycalendar.min.css"
            }
        },

        uglify: {
            distVersion: {
                options : {
                    banner : "/*!\n" +
                    " * dyCalendar is a JavaScript library for creating Calendar.\n" +
                    " *\n" +
                    " * Author: Yusuf Shakeel\n" +
                    " * https://github.com/yusufshakeel\n" +
                    " *\n" +
                    " * GitHub Link: https://github.com/yusufshakeel/dyCalendarJS\n" +
                    " *\n" +
                    " * MIT license\n" +
                    " * Copyright (c) 2016 Yusuf Shakeel\n" +
                    " *\n" +
                    " * Date: 2014-08-17 sunday\n" +
                    " * Build: <%= grunt.template.today(\"yyyy-mm-dd HH:MM:ss\") %> \n" +
                    " */",
                    mangle: true
                },
                files: {
                    'js/dycalendar.min.js': [
                        'js/dycalendar.js'
                    ],
                    'js/dycalendar-jquery.min.js': [
                        'js/dycalendar-jquery.js'
                    ]
                }
            }
        }

    });

    // load plugin
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // create default task
    grunt.registerTask("default", ["cssmin", "uglify:distVersion"]);

};