import es6Lib from '../src/index'
import { chai, polyfill, gulp }  from '../src/index'

let expect = chai.expect
describe('es6-lib basics', function () {
  it('should exist', function () {
    expect(es6Lib).to.be.function
  })

  it('should re-export chai', function () {
    expect(chai).to.be.object
  })

  it('should re-export polyfill', function () {
    expect(polyfill).to.be.function
  })

  it('should re-export gulp', function () {
    expect(gulp).to.be.object
  })
})
