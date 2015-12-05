import gulp from 'gulp'
import tasks from './src/gulp_tasks'

tasks({
  gulp: gulp,
  rootDir: __dirname,
  testEnv: 'node'
})
