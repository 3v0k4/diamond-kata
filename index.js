const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const alphabetUntilBefore = char => alphabet.slice(0, alphabet.indexOf(char))

const make = char => {
  const pre = alphabetUntilBefore(char)
  const post = pre.slice().reverse()
  const chars = pre.concat([char]).concat(post)
  return chars.join('\n')
}

module.exports = make
