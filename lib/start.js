const clear = require( 'clear' )
const chalk = require( 'chalk' )
const inquirer = require( 'inquirer' )
const gameList = require('./games/index')

/**
 * 
 * @param {{name:string}} options 选项：name - 游戏名
 */
async function startGame (options = {}) {
  clear()
  let gameName = options.name
  if(!gameName || !gameList.some(g => g.name === gameName)) {
    console.log( chalk.green( '--------------------------- 选择游戏 -------------------------' ) )
    gameList.map( (m, i) => {
      console.log( chalk.green( `                           ${i+1}.${ m.name }                ` ) )
    } )
    console.log( chalk.green( '--------------------------------------------------------------' ) )

    const info = await inquirer.prompt( {
      type: 'list',
      name: 'type',
      message: '请选择',
      choices: gameList.concat( { name: '返回首页', value: 'back' } )
    } )

    if(info.type === 'back') {
      const home = require('./index')
      await home()
      return
    }
    gameName = info.type
  }

  try {
    const game = require(`./games/${gameName}`)
    if(game && game.game) {
      await game.game()
    }
  } catch(err) {
    console.log(`The game ${gameName} is not found`)
  }
}

module.exports = startGame