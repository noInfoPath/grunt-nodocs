/*
 * grunt-nodocs
 * @version 0.0.10
 *
 * Copyright (c) 2015 The NoInfoPath Group, llc.
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

    //Reading in file defined by the user
    var readInFile = grunt.file.read(noSrc);

    var newLine = "\n",
        markdown = "",
        currentMarker = "",
        endMarker = "*/",
        isWriting = false,
        noTable = "",
        noTableArray = noContents,
        lines = readInFile.split(newLine),
        noTableContents = "# Table Of Contents " + newLine,
        noBuckets = {};

    var noHashyHash = {};

    //Turns user defined array of starting comments into a hash table 
    for(var i in noStart){
      noHashyHash[noStart[i]] = noStart[i];
    }

    for(var l in lines) {
      var line = lines[l],
          trimmedLine = line.trim(),
          startOfLine = 0;

      //Because we are trimming white space from each line, if we 
      //find a blank link we will still trim it, but insert a newline
      //for markdown purposes.
      if(trimmedLine === ""){
        line = newLine;
      } else {
        line = trimmedLine;
      }

      //Index of comment *
      startOfLine = line.indexOf("*") + 2;

      //Will check each line against the user defined start syntax to
      //determine when to start recording the comment blocks and filters
      //out all code that has been written.
      currentMarker = noHashyHash[line];

      isWriting = isWriting || !!currentMarker;

      //Will check each line against a pre-defined endMarker(*/) syntatx to
      //determine when to stop writing out lines of text...aka comment block
      //is finished.
      if(line === endMarker) {
        isWriting = false;
        markdown = markdown + newLine;
      }

      if(isWriting){
        if((line.indexOf(currentMarker) === -1) && (line[0] !== "@") && (line[0] !== "/")){
          if(startOfLine === 2){
            line = line.substr(startOfLine);
          }
            markdown = markdown + line + newLine;
        }
      }
    }

    //Write contents to the user's destination
    grunt.file.write(noDest,markdown);
  };

  grunt.registerMultiTask('nodocs', 'The best Grunt plugin ever.', function() {
    
    //Grab all options specified by the user
    var options = this.options();

    //User specified Source(src), Destination(dest), Starting comment syntax(start), Starting @ syntax(tableofconents) 
    noDocs(options.src, options.dest, options.start, options.tableofcontents);
  });
};
