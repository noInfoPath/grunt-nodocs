/*
 * grunt-nodocs
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
      internal: {
        options: {
          src: 'test.js',
          dest: 'test.md',
          start: ['/**', '/*'],
          tableofcontents: ['@Class','@Function']
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
