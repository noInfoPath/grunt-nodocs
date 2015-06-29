/*
 * grunt-nodocs
 * 
 *
 * Copyright (c) 2015 The NoInfoPath Group, llc.
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    noDocs: {
      internal: {                                 // Task
        options: {                                // Options
          src: 'test/src.js',                          // Source Location  
          dest: 'internal.md',                    // Destination Location
          start: ['/*','/**']                     // How the code block starts.
        }
      },
      external: {                                 // Task
        options: {                                // Options
          src: 'test/src.js',                          // Source Location  
          dest: 'external.md',                    // Destination Location
          start: ['/*']                           // How the code block starts.
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

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-bumpup');
  grunt.loadNpmTasks('grunt-version');

  grunt.registerTask('build', ['bumpup', 'version']);
};
