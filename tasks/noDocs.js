/*
 * grunt-nodocs
 * @version 0.0.6
 * https://github.com/Ryan/temp
 *
 * Copyright (c) 2015 ryeguyimg
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {
  /*

  ## Parameters

  |Name|Type|Description|
  |----|----|-----------|
  |noSrc|string|Text source that is broken up by new lines(\n)|
  |noDest|string|User defined directory for newly created markdown file|
  |noStart|[string]|User defined array of starting comment syntax|
  |noContents|[string]|User defined array of @ to record table of contents|
  */

  function noDocs(noSrc, noDest, noStart, noContents){

    var noRead = grunt.file.read(noSrc);

    var noContent = noRead.split("\n"),
        noDoc = "",
        noEnd = "*/",
        noIsWriting = false,
        noLine = "\n",
        noTable = "",
        noTableArray = noContents,
        noTableContents = "# Table Of Contents \n",
        noBuckets = {};

    for(var b in noContents){
      noBuckets[noContents[b].slice(1)] = [];
    }

    for(var i in noStart) {
      for(var l in noContent) {
        var line;

        //Because we are trimming white space from each line, if we 
        //find a blank link we will still trim it, but insert a newline
        //for markdown purposes.
        if(noContent[l].trim() !== ""){
          line = noContent[l].trim();
        } else {
          line = "\n";
        }

        //Will check each line against the user defined start syntax to
        //determine when to start recording the comment blocks and filters
        //out all code that has been written. 
        if(line === noStart[i]) {
          noIsWriting = true;
        }

        //Will check each line against a pre-defined noEnd(*/) syntatx to
        //determine when to stop writing out lines of text...aka comment block
        //is finished.
        if(line === noEnd) {
          noIsWriting = false;
          noDoc = noDoc + noLine;
        }

        if(noIsWriting){
          for(var t in noTableArray){
            if(line.indexOf(noTableArray[t]) > -1){
              //Push all headers onto it's respected hash defined by the user
              noBuckets[noTableArray[t].slice(1)].push(line.slice(noTableArray[t].length));
            }
          }
          if(line.indexOf(noStart[i]) === -1){
            noDoc = noDoc + line + noLine;
          }
        }
      }
    }

    for (var bi in noBuckets){
      var bucket = noBuckets[bi];

      noTableContents = noTableContents + bi + noLine;

      for (var b in bucket) {
        noTableContents = noTableContents + bucket[b] + noLine;
      }
    }
    
    //Write contents to the user's destination
    grunt.file.write(noDest,noDoc);
  };

  grunt.registerMultiTask('noDocs', 'The best Grunt plugin ever.', function() {
    
    //Grab all options specified by the user
    var options = this.options();

    //Uses specified Source(src), Destination(dest), and Starting comment syntax(start)
    noDocs(options.src, options.dest, options.start, options.tableofcontents);
  });
};
