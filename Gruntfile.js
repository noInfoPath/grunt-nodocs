/*
 * grunt-noDocs
 * 
 *
 * Copyright (c) 2015 IMG
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    // Configuration to be run (and then tested).
    noDocs: {
      ballers: {
        options: {
          noSrc: 'test.js',
          noDest: 'test.md',
          noStart: ['/*@', '/*#']
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
