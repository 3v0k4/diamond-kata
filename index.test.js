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
const lastRow = string => string.split('\n')[string.split('\n').length - 1]
const leading = (char, string) => {
  const index = string.indexOf(char)
  return string.slice(0, index)
}
const trailing = (char, string) => {
  const index = string.indexOf(char)
  return string.slice(index + 1)
}
const firstRowHasSymmetricalContour = diamond => {
  const leadingElements = leading('A', firstRow(diamond)).length
  const trailingElements = trailing('A', firstRow(diamond)).length
  return leadingElements === trailingElements
}

describe('diamond', () => {
  jsc.property('is not empty', char, c => make(c).length !== 0)
  jsc.property('first row contains A', char, c => firstRow(make(c)).trim() === 'A')
  jsc.property('last row contains A', char, c => lastRow(make(c)).trim() === 'A')
  jsc.property('first row has symmetrical contour', char, c => firstRowHasSymmetricalContour(make(c)))
})
