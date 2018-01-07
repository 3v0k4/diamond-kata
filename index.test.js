const jsc = require('jsverify')
const mocha = require('mocha')

const isFive = require('./index')

describe('TODO', () => {
  jsc.property('TODO', jsc.constant(5), isFive)
})
