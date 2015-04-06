// NOTE must be es5
/*eslint no-var: 0, strict: [2, "global"] */
'use strict'
var es6lib = require('./src/index')
var gulp = require('gulp')

es6lib({
  gulp: gulp,
  rootDir: __dirname
})
