# grunt-noDocs

### Installation 

```
npm install grunt-nodocs --save-dev
```

### NpmTask

```
grunt.loadNpmTasks('grunt-nodocs');
```

## noDocs Task
Run this task with the `grunt noDocs` command.

noDocs was created to satisfy the need to grab blocks of comments out of source files. First and foremost noDocs allows the user to simply grab the comments they have written and put them in a seperate file with an extention of their choice(we wrote this for MD purposes), but secondly the user is able to determine to whom the comments are shown to.

With markdown being the sole method of writing proper documentation, we assume and encourage the user to write their comments in markdown fashion. The only peice that is required is that you start and end the comment block with the following tags:

```js
/*


*/
```

But you can easily add to the starting line of your block comment to differentiate between internal and external comments:

Internal:
```
/*$

*/
```

External:
```
/*@

*/
```

Code Sample:

```js
/*
	# noDocs Markdown Text

	## Isn't this amazing?
*/
noDocs fucntion(){
	//Do Work
}
```

#### Options

##### src
Type: `String`

The file path of the source file.

##### dest
Type: `String`

The file path for the destination of the output file.

##### start
Type: `String`

Starting line of comment block. Can be used to distinguish comments that are meant for internal use and comments for external use

## Example

### Example config:

```js
  grunt.initConfig({

    noDocs: {
      internal: {               // Task
        options: {              // Options
          src: 'src.js',        // Source Location
          dest: 'dest.md',      // Destination Location
          start: '/**'          // How the code block starts.
        }
      }
    }
  });
  
  loadNpmTasks('grunt-nodocs');
```

# Release History:
 - 2015-06-23 v0.0.5 Updated documentation...words can be hard.
 - 2015-06-23 v0.0.4 Updated bugs in example config
 - 2015-06-23 v0.0.3 Removed outer for loop for [start] and changed [start] to just a start string
 - 2015-06-22 v0.0.2 Fixed a bug with checking for start of comment block 
 - 2015-06-22 v0.0.1 Initial Release
