
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import * as File from 'vinyl'
import through = require('through2')
const { beautify, compiler } = require('flowgen').default

const gulpFlowgen = (): NodeJS.ReadWriteStream =>
  through.obj((file: File, encoding: string, next: Function) => {

    if (file.isBuffer() && /\.d\.ts$/.test(file.path)) {
      const flowFile = file.clone({ contents: false })

      // Set output file extension to .js.flow
      flowFile.basename = file.basename.replace(/\.d.ts$/, '.js.flow')

      // Compile to a Flow Definition File
      flowFile.contents = new Buffer(
        beautify(compiler.compileDefinitionString(file.contents.toString()))
      )

      next(null, flowFile)
    }
    else
      next(null, file)
  })

export = gulpFlowgen
