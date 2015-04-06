// NOTE must be es5
var es6lib = require('./src/index')
var gulp = require('gulp')

es6lib({
  gulp: gulp,
  rootDir: __dirname,
  testEnv: 'node'
})
