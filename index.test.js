const jsc = require('jsverify')
const mocha = require('mocha')

const isFive = require('./index')

const debug = x => {
  console.log(x)
  return true;
}

describe('diamond', () => {
  jsc.property('is not empty', jsc.asciichar, debug)
})
