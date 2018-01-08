const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetUntilBefore = char => alphabet.slice(0, alphabet.indexOf(char))
const internalPaddingFor = char => {
  const index = alphabet.indexOf(char)
  return Math.max((index * 2) - 1, 0)
}

const makeRow = width => char => {
  if (char === 'A') {
    const padding = ' '.repeat(width / 2)
    return `${padding}A${padding}`
  } else {
    const internalSpaces = internalPaddingFor(char)
    const internalPadding = ' '.repeat(internalSpaces)
    const externalSpaces = width - 2 - internalSpaces
    const externalPadding = ' '.repeat(externalSpaces / 2)
    return `${externalPadding}${char}${internalPadding}${char}${externalPadding}`
  }
}

const make = char => {
  const pre = alphabetUntilBefore(char)
  const post = pre.slice().reverse()
  const chars = pre.concat([char]).concat(post)
  return chars.map(makeRow(chars.length)).join('\n')
}

module.exports = make
