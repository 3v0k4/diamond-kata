const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetUntilBefore = char => alphabet.slice(0, alphabet.indexOf(char))

const makeRow = width => char => {
  if (char === 'A') {
    const padding = ' '.repeat(width / 2)
    return `${padding}A${padding}`
  } else {
    const padding = ' '.repeat(width - 2)
    return `${char}${padding}${char}`
  }
}

const make = char => {
  const pre = alphabetUntilBefore(char)
  const post = pre.slice().reverse()
  const chars = pre.concat([char]).concat(post)
  return chars.map(makeRow(chars.length)).join('\n')
}

module.exports = make
