const jsc = require('jsverify')
const mocha = require('mocha')

const make = require('./index')

const debug = x => {
  console.log(x)
  return true;
}

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetUntilBefore = char => alphabet.slice(0, alphabet.indexOf(char))
const char = jsc.suchthat(jsc.asciichar, c => alphabet.includes(c))
const firstRow = string => string.split('\n')[0]
const lastRow = string => string.split('\n')[string.split('\n').length - 1]
const indexOfFirstChar = string => string.search(/[A-Z]/)
const indexOfLastChar = string => (string.length - 1) - (string.split('').reverse().join('').search(/[A-Z]/))
const leading = string => string.slice(0, indexOfFirstChar(string))
const trailing = string => string.slice(indexOfLastChar(string) + 1)
const rowHasSymmetricalContour = row => leading(row).length === trailing(row).length
const rowsHaveSymmetricalContour = diamond =>
  diamond.split('\n').map(rowHasSymmetricalContour).reduce((acc, x) => acc && x)
const rowsContainsCorrectLetters = (char, diamond) => {
  const pre = alphabetUntilBefore(char)
  const post = pre.slice().reverse()
  const expected = pre.concat([char]).concat(post)
  const actual = diamond.split('\n').map(row => row.trim()[0])
  return expected.join() === actual.join()
}
const hasLength = length => string => string.length === length
const rowsAreAsWideAsHigh = diamond => {
  const rows = diamond.split('\n')
  const height = rows.length
  return rows.map(hasLength(height)).reduce((acc, x) => acc && x)
}

describe('diamond', () => {
  jsc.property('is not empty', char, c => make(c).length !== 0)
  jsc.property('first row contains A', char, c => firstRow(make(c)).trim() === 'A')
  jsc.property('last row contains A', char, c => lastRow(make(c)).trim() === 'A')
  jsc.property('rows have symmetrical contour', char, c => rowsHaveSymmetricalContour(make(c)))
  jsc.property('rows contains the correct letters', char, c => rowsContainsCorrectLetters(c, make(c)))
  jsc.property('rows are as wide as high', char, c => rowsAreAsWideAsHigh(make(c)))
})
