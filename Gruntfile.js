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
      nodata: {
        options: {
          src: 'src/noinfopath-data.js',
          dest: 'docs/noinfopath-data.md',
          start: ['/**', '/*']
        }
      },
      nokendo: {
        options: {
          src: 'src/noinfopath-kendo.js',
          dest: 'docs/noinfopath-kendo.md',
          start: ['/**', '/*']
        }
      },
      noui: {
        options: {
          src: 'src/noinfopath-ui.js',
          dest: 'docs/noinfopath-ui.md',
          start: ['/**', '/*']
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
