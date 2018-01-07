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
const leading = string => {
  const index = string.search(/[A-Z]/)
  return string.slice(0, index)
}
const trailing = string => {
  const index = string.search(/[A-Z]/)
  return string.slice(index + 1)
}
const rowHasSymmetricalContour = row => {
  const leadingElements = leading(row).length
  const trailingElements = trailing(row).length
  return leadingElements === trailingElements
}
const rowsHaveSymmetricalContour = diamond =>
  diamond.split('\n').map(rowHasSymmetricalContour).reduce((acc, x) => acc && x)

describe('diamond', () => {
  jsc.property('is not empty', char, c => make(c).length !== 0)
  jsc.property('first row contains A', char, c => firstRow(make(c)).trim() === 'A')
  jsc.property('last row contains A', char, c => lastRow(make(c)).trim() === 'A')
  jsc.property('rows have symmetrical contour', char, c => rowsHaveSymmetricalContour(make(c)))
  jsc.property('top rows including the middle one contains the correct letters', char, c => {
    const diamond = make(c)
    const chars = alphabet.slice(0, alphabet.indexOf(c) + 1)
    const charsInDiamond = diamond.split('\n').map(row => row.trim())
    return chars.join() === charsInDiamond.join()
  })
})
