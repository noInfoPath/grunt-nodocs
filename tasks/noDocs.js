/*
 * grunt-nodocs
 * @version 1.0.2
 *
 * Copyright (c) 2015 The NoInfoPath Group, llc.
 * Licensed under the MIT license.
 */
module.exports = function(grunt) {

	'use strict';
	/*
	 * @function noDocs
	 *
	 * ## Parameters
	 *
	 * |Name|Type|Description|
	 * |----|----|-----------|
	 * |src|string|Text source that is broken up by new lines(\n)|
	 * |dest|string|User defined directory for newly created markdown file|
	 * |start|[string]|User defined array of starting comment syntax|
	 */

	function noDocs(options) {

		var toc = "",
			tocCounter = 1,
			ops = options,
			markdown = "";

		grunt.file.expand(ops.src).forEach(function(dir) {
			/*
			 *
			 * Reading in file defined by the user
			 */
			var readInFile = grunt.file.read(dir),
				pathArray = dir.split("/"),
				fileName = "";

			if(pathArray.length > 0){
				fileName = pathArray[pathArray.length - 1];
				fileName = fileName.replace(".js", ".md");
			}
			/*
			 * |Name|Type|Description|
			 * |----|----|-----------|
			 * |newLine|string|A New Line Constant|
			 * |markdown|String|The document that is being written with all comments pulled from the user's code|
			 * |currentMarker||
			 * |endMarker|String|Typical code block ending syntax as a constant|
			 * |isWriting|Boolean|Whether to write out a line to the document or not..aka whether the line is a comment or not|
			 * |noTable|||
			 * |noTableArray|||
			 * |lines|||
			 * |noTableContents|||
			 * |noBuckets|||
			 */
			var newLine = "\n",
				currentMarker = "",
				endMarker = "*/",
				isWriting = false,
				lines = readInFile.split(newLine);
			/* Will be used when making table of comments
			 *
			 * noTable = "",
			 * noTableArray = tableOfContentsTags,
			 *
			 * noTableContents = "# Table Of Contents " + newLine,
			 * noBuckets = {};
			 */
			/*
			 * |Name|Type|Description|
			 * |----|----|-----------|
			 * |noHashyHash|object|Used to convert user defined starting comment lines to a has table|
			 */
			var noHashyHash = {};

			/*
			 * Turns user defined array of starting comments into a hash table
			 */
			for (var i in ops.start) {
				noHashyHash[ops.start[i]] = ops.start[i];
			}

			for (var l in lines) {
				var line = lines[l],
					trimmedLine = line.trim(),
					startOfLine = 0;

				/*
				 * Because we are trimming white space from each line, if we
				 * find a blank link we will still trim it, but insert a newline
				 * for markdown purposes.
				 */
				if (trimmedLine === "") {
					line = newLine;
				} else {
					line = trimmedLine;
				}

				/*
				 * Index of comment *
				 */
				startOfLine = line.indexOf("*") + 2;

				/*
				 * Will check each line against the user defined start syntax to
				 * determine when to start recording the comment blocks and filters
				 * out all code that has been written.
				 */
				currentMarker = noHashyHash[line];

				isWriting = isWriting || !!currentMarker;

				/*
				 * Will check each line against a pre-defined endmarker syntax to
				 * determine when to stop writing out lines of text...aka comment block
				 * is finished.
				 */
				if (line === endMarker) {
					isWriting = false;
					markdown = markdown + newLine;
				}

				/*
				 * Once isWriting is true, we then make sure that we are actually at a
				 * comment block, we are not writing the the first line of the comment
				 * block
				 */
				if (isWriting) {
					if ((line.indexOf(currentMarker) === -1) && (line[0] !== "@") && (line[0] !== "/")) {
						if (startOfLine === 2) {
                            if(line && line[0] === "*" && line[2] !== "@"){
                                line = line.substr(startOfLine);
                                markdown = markdown + line + newLine;
                            } else if (line && line[2] === "@"){
                                line = line.split("@module");
                                toc = toc + tocCounter + ":" + line[1] + newLine;
                                tocCounter++;
                            }
						}
					}
				}
			}
			/*
			 * Write to multiple markdown files if true
			 */
			if(options.multiDocs && options.multiDocs.multiFiles && options.multiDocs.dest){
				grunt.file.write(options.multiDocs.dest + fileName, markdown);
				//empty markdown variable for another page
				markdown = "";
			}
			/*
			 * Write contents(markdown) to the user's destination(dest)
			 */
			if(!options.multiDocs || !options.multiDocs.multiFiles || options.multiDocs.multiFiles === false){
				grunt.file.write(ops.dest, markdown);
			}
		});
	}

	grunt.registerMultiTask('nodocs', 'The best Grunt plugin ever.', function() {

		/*
		 * Grab all options specified by the user
		 * var options = this.options();
		 */
		var options = this.options();

		/*
		 * User specified Source(src), Destination(dest), Starting comment syntax(start), Starting @ syntax(tableofconents)
		 */
		noDocs(options);
	});
};
