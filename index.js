const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const make = char => {
  const chars = alphabet.slice(0, alphabet.indexOf(char) + 1)
  return chars.join('\n')
}

module.exports = make
