/*
 * grunt-nodocs
 *
 *
 * Copyright (c) 2015 The NoInfoPath Group, llc.
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {
  'use strict';
  // Project configuration.
  grunt.initConfig({
    nodocs: {
        test: {                                       // Task
            options: {                                // Options
                src: ['test/*', '!test/*.html'],      // Source Location
                dest: 'test/test.md',                 // Destination Location
                start: ['/*','/**']                   // How the code block starts.
            }
        }
    },
    bumpup: {
      file: 'package.json'
    },
    version: {
      options: {
        prefix: '@version\\s*'
      },
      defaults: {
        src: ['tasks/noDocs.js']
      }
    }
  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks('grunt-version');

  grunt.registerTask('build', ['bumpup', 'version']);
};
