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
const rows = string => string.split('\n')
const firstRow = string => rows(string)[0]
const lastRow = string => rows(string)[rows(string).length - 1]
const indexOfFirstChar = string => string.search(/[A-Z]/)
const indexOfLastChar = string => (string.length - 1) - (string.split('').reverse().join('').search(/[A-Z]/))
const leading = string => string.slice(0, indexOfFirstChar(string))
const trailing = string => string.slice(indexOfLastChar(string) + 1)
const rowHasSymmetricalContour = row => leading(row).length === trailing(row).length
const all = xs => xs.reduce((acc, x) => acc && x, true)
const rowsHaveSymmetricalContour = diamond =>
  all(rows(diamond).map(rowHasSymmetricalContour))
const rowsContainsCorrectLetters = (char, diamond) => {
  const pre = alphabetUntilBefore(char)
  const post = pre.slice().reverse()
  const expected = pre.concat([char]).concat(post)
  const actual = rows(diamond).map(row => row.trim()[0])
  return expected.join() === actual.join()
}
const hasLength = length => string => string.length === length
const rowsAreAsWideAsHigh = diamond => {
  const height = rows(diamond).length
  return all(rows(diamond).map(hasLength(height)))
}
const hasTwoIdenticalLetters = string => {
  const trimmed = string.replace(/\s/g, '')
  return trimmed.length === 2 && trimmed[0] === trimmed[1]
}
const internalRowsHaveTwoIdenticalLetters = diamond => {
  const internalRows = rows(diamond).slice(1, rows(diamond).length - 2)
  return all(internalRows.map(hasTwoIdenticalLetters))
}
const firstChar = row => row.trim()[0]
const expectedExternalSpaces = (width, row) => {
  const char = row.match(/[A-Z]/)[0]
  const index = alphabet.indexOf(char)
  return ((width - 1) / 2 - index) * 2
}
const externalSpaces = (width, row) => {
  if (firstChar(row) === 'A') return width - 1
  const match = row.match(/(\s*)[A-Z]\s*[A-Z](\s*)/)
  return match[1].concat(match[2]).length
}
const hasCorrectAmountOfExternalSpaces = width => row =>
  externalSpaces(width, row) === expectedExternalSpaces(width, row)
const rowsHaveCorrectAmountOfExternalSpaces = diamond =>
  all(rows(diamond).map(hasCorrectAmountOfExternalSpaces(rows(diamond).length)))

describe('diamond', () => {
  jsc.property('is not empty', char, c => make(c).length !== 0)
  jsc.property('first row contains A', char, c => firstRow(make(c)).trim() === 'A')
  jsc.property('last row contains A', char, c => lastRow(make(c)).trim() === 'A')
  jsc.property('rows have symmetrical contour', char, c => rowsHaveSymmetricalContour(make(c)))
  jsc.property('rows contains the correct letters', char, c => rowsContainsCorrectLetters(c, make(c)))
  jsc.property('rows are as wide as high', char, c => rowsAreAsWideAsHigh(make(c)))
  jsc.property('rows except top and bottom have two identical letters', char, c => internalRowsHaveTwoIdenticalLetters(make(c)))
  jsc.property('rows have the correct amount of external spaces', char, c => rowsHaveCorrectAmountOfExternalSpaces(make(c)))
})
