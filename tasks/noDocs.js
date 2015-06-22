/*
 * grunt-temp
 * @version 0.0.1
 * https://github.com/Ryan/temp
 *
 * Copyright (c) 2015 ryeguyimg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  /*

  ## Parameters

  |Name|Type|Description|
  |----|----|-----------|
  |content|string|Text source that is broken up by new lines(\n)|
  |start|string[]|User defined array of starting comment syntax|

  */

  function noDocs(noSrc, noDest, start){

    var noRead = grunt.file.read(noSrc);

    var noContent = noRead.split("\n"),
        noDoc = "",
        noEnd = "*/",
        noIsWriting = false,
        noLine = "\n",
        noStart = start;

    for(var i in noStart){
      for(var l in noContent){
        var line = noContent[l].trim();

        if(line.indexOf(noStart[i]) > -1){
          noIsWriting = true;
        }

        if(line.indexOf(noEnd) > -1){
          noIsWriting = false;
        }

        if(noIsWriting){
          if(line.indexOf(noStart[i]) === -1){
            noDoc = noDoc + line + noLine;
          }
        }
      }
    }

    //Write contents to the user's destination
    grunt.file.write(noDest,noDoc);
  };

  grunt.registerMultiTask('noDocs', 'The best Grunt plugin ever.', function() {
    
    //Grab all options specified by the user
    var options = this.options();

    //Uses specified Source(noSrc), Destination(noDest), and Starting comment syntax(noStart)
    noDocs(options.noSrc, options.noDest, options.noStart);
  });
};
