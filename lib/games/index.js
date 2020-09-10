const { name: gameName1, key: gameKey1 } = require('./guess-number')
const { name: gameName2, key: gameKey2 } = require('./rock-paper-scissors')

module.exports = [
  { name: gameName1, value: gameKey1 },
  { name: gameName2, value: gameKey2 },
]