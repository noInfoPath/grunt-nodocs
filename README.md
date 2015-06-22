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

noDocs was created to satisfy the need to grab blocks of comments out of source files. First and foremost noDocs allows the user to simply grab the comments they have written and put them in a seperate file with an extention of their choice(we wrote this for MD purposes), but secondly the user is able to determine to whom the comments are shown to. We give the user the optiton to include multiple comments "noStart" as they're called to determine which comments are internal and external.

With markdown being the sole method of writing proper documentation, we assume and encourage the user to write their comments in markdown fashion. The only peice that is required is that you start and end the comment block with the following tags:

```js
/*


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

##### noSrc
Type: `String`

The file path of the source file.

##### noDest
Type: `String`

The file path for the destination of the output file.

##### noStart
Type: `[String]`

Starting line of comment block. Can be used to distinguish comments that are meant for internal use and comments for external use

## Example

### Example config:

```js
  grunt.initConfig({

    noDocs: {
      internal: {               // Task
        options: {              // Options
          noSrc: 'src.js',     // Source Location
          noDest: 'dest.md',    // Destination Location
          noStart: ['/*@']      // How the code block starts. Can be used to distinguish between internal and external comments
        }
      }
    }
  });
  
  loadNpmTasks('grunt-nodocs');
```