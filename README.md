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

noDocs fills the need for a simple tasks, to grab comments out of a piece of code and turn into a markdown file. It's simple and can be done by hand, but what happens when you code is 1000+ lines long?

With markdown being the sole method of writing proper documentation, we assume and encourage the user to write their comments in markdown fashion. The only peice that is required is that you start and end the comment block with the following tags and each tag must be on their own line.

```js
/*

Comments go between the starting and ending comment block lines

*/
```

noDocs' algorithm also allows for the user to distinguish between internal comments and external comments. Below we give an example of how to accomplish this. By simply adding another character to the end of the starting comment line you can distinguish between what should be seen by the outside world and what should be seen by everyone.

Internal:
```
/**

*/
```

External:
```
/*

*/
```

Code Sample:

```js
/**
  # This is an internal comment - All comments in a piece of code(For internal purposes)
  # noDocs Markdown Text

  ## Isn't this amazing?
*/
noDocsInternal fucntion(){
	//Do Work
}

/*
  # This is an external comment - User specified set of comments that can be seen by the public
  # noDocs Markdown Text

  ## Isn't this amazing?
*/
noDocsExternal fucntion(){
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
Type: `[String]`

Starting line of comment block. Can be used to distinguish comments that are meant for internal use and comments for external use

## Example

### Example config:

```js
  grunt.initConfig({
    noDocs: {
      internal: {                                 // Task
        options: {                                // Options
          src: 'src.js',                          // Source Location  
          dest: 'internal.md',                    // Destination Location
          start: ['/*','/**']                     // How the code block starts.
        }
      },
      external: {                                 // Task
        options: {                                // Options
          src: 'src.js',                          // Source Location  
          dest: 'external.md',                    // Destination Location
          start: ['/*']                           // How the code block starts.
        }
      }
    }
  });
  
  loadNpmTasks('grunt-nodocs');
```

# Release History:
 - 2015-06-24 v0.0.6 Made option:start an array again to allow for multiple sweeps of the code instead of multiple tasks and updated documentation
 - 2015-06-23 v0.0.5 Updated documentation...words can be hard.
 - 2015-06-23 v0.0.4 Updated bugs in example config
 - 2015-06-23 v0.0.3 Removed outer for loop for [start] and changed [start] to just a start string
 - 2015-06-22 v0.0.2 Fixed a bug with checking for start of comment block 
 - 2015-06-22 v0.0.1 Initial Release
