# grunt-nodocs

### Installation

```
npm install grunt-nodocs --save-dev
```

### NpmTask

```
grunt.loadNpmTasks('grunt-nodocs');
```

## nodocs Task
Run this task with the `grunt nodocs` command.

nodocs fills the need for a simple task, to grab comments out of a piece of code and turn them into a markdown file. It's simple and can be done by hand, but what happens when your code is 1000+ lines long?

Also, with markdown being the sole method of writing proper documentation, we assume and encourage the user to write their comments in markdown fashion.

### Comment Syntax Requirements:
 - Comments must at least start and end with the conventional block comment tags `/*`, `*/`.
 - Each line must start with an `*`.
 - There must be a single space between the `*` and the start of your comments.

```js
/*
 *
 * Comments go between the starting and ending comment block lines
 *
*/
```

nodocs' algorithm also allows for the user to distinguish between internal comments and external comments. Below we give an example of how to accomplish this. By simply adding another character to the end of the starting comment line you can distinguish between what should only be seen internally and what can be seen by the outside world.

Internal:
```
/**
 *
 *
*/
```

External:
```
/*
 *
 *
*/
```

### Default Code Sample:

```js
/**
 * # This is an internal comment - For internal use.
 * # noDocs Markdown Text
 *
 * ## Isn't this amazing?
*/
noDocsInternal function(){
  //Do Work
}

/*
 * # This is an external comment - User specified set of comments that can be seen by the public
 * # noDocs Markdown Text
 *
 * ## Isn't this amazing?
*/
noDocsExternal function(){
  //Do Work
}
```

#### Options

##### src
Type: `[String]`

The file path of the source file.

##### dest
Type: `String`

The file path for the destination of the output file.

##### start
Type: `[String]`

Starting line of comment block. Can be used to distinguish comments that are meant for internal use and comments for external use

## Example - Basic:

```js
  grunt.initConfig({
    nodocs: {
      internal: {                                 // Task
        options: {                                // Options
          src: 'src/src.js',                      // Source Location  
          dest: 'internal.md',                    // Destination Location
          start: ['/*','/**']                     // How the code block starts.
        }
      },
      external: {                                 // Task
        options: {                                // Options
          src: 'src/src.js',                      // Source Location  
          dest: 'external.md',                    // Destination Location
          start: ['/*']                           // How the code block starts.
        }
      }
    }
  });

  loadNpmTasks('grunt-nodocs');
```

## Example - Wildcard:

```js
  grunt.initConfig({
    nodocs: {
      internal: {                                 // Task
        options: {                                // Options
          src: 'src/*.js',                        // Source Location  
          dest: 'internal.md',                    // Destination Location
          start: ['/*','/**']                     // How the code block starts.
        }
      }
    }
  });

  loadNpmTasks('grunt-nodocs');
```

## Example - Negated Files:

```js
  grunt.initConfig({
    nodocs: {
      internal: {                                 // Task
        options: {                                // Options
          src: ['src/*', '!src/*.html'],          // Source Location  
          dest: 'internal.md',                    // Destination Location
          start: ['/*','/**']                     // How the code block starts.
        }
      }
    }
  });

  loadNpmTasks('grunt-nodocs');
```

# Release History:
 - 2015-09-08 v0.0.11 Integrated wildcard functionality into src location option. Users can now specify a directory with multiple javascript files.
 - 2015-06-29 v0.0.10 Words are still hard...spelling mistakes
 - 2015-06-29 v0.0.9 Refactored code for better self-documenting/human readable code. Fixed a bug with trimming each line(in case of code blocks and other formatting techniques).
 - 2015-06-29 v0.0.8 File rename
 - 2015-06-29 v0.0.7 Removed outer for loop to check for starting comment markers. Now checks against hash to write comments in the correct order.
 - 2015-06-24 v0.0.6 Made option:start an array again to allow for multiple sweeps of the code instead of multiple tasks and updated documentation
 - 2015-06-23 v0.0.5 Updated documentation...words can be hard.
 - 2015-06-23 v0.0.4 Updated bugs in example config
 - 2015-06-23 v0.0.3 Removed outer for loop for [start] and changed [start] to just a start string
 - 2015-06-22 v0.0.2 Fixed a bug with checking for start of comment block
 - 2015-06-22 v0.0.1 Initial Release
