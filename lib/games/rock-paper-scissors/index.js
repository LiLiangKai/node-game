const clear = require( 'clear' )
const config = require('./config')

/**
 * 剪刀石头布游戏
 */
async function game () {
  clear()
  console.log('剪刀石头布')
}

module.exports = {
  ...config,
  game
}