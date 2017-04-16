Gulp Flowgen
============

Gulp Plugin for [Flowgen](https://github.com/joarwilk/flowgen).

TypeScript Setup Example
------------------------

```js
const gulp = require('gulp')
const merge = require('merge-stream')
const typescript = require('gulp-typescript')
const flowgen = require('gulp-flowgen')

const tsOptions = require('./tsconfig.json').compilerOptions
const tsProject = typescript.createProject(tsOptions)

const build = () => {
  const tsResult =
    gulp.src('**/*.ts')
      .pipe(tsProject())

  // Merge JavaScript output, TypeScript definition files, and a Flow definition files created from the TypeScript dts stream
  return merge(
    tsResult.js,
    tsResult.dts,
    tsResult.dts.pipe(flowgen())
  )
    .pipe(gulp.dest(tsOptions.outDir))
}
```
