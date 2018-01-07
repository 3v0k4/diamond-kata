const jsc = require('jsverify')
const mocha = require('mocha')

const isFive = require('./index')

const debug = x => {
  console.log(x)
  return true;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const char = jsc.suchthat(jsc.asciichar, c => alphabet.includes(c))

describe('diamond', () => {
  jsc.property('is not empty', char, debug)
})
