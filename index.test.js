const jsc = require('jsverify')
const mocha = require('mocha')

const make = require('./index')

const debug = x => {
  console.log(x)
  return true;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const char = jsc.suchthat(jsc.asciichar, c => alphabet.includes(c))
const firstRow = string => string.split('\n')[0]

describe('diamond', () => {
  jsc.property('is not empty', char, c => make(c).length !== 0)
  jsc.property('first row contains A', char, c => firstRow(make(c)).trim() === 'A')
})
