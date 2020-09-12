/**
 * 石头剪刀布
 * @author Hiya
 * @date 2020/09/11
 */

const clear = require( 'clear' )
const inquirer = require( 'inquirer' )
const config = require('./config')
const { ROCK_PAPER_SCISSORS_MAP } = require('./constant')
const {
  printGameName,
  gameMenu,
  backStartInterface,
  gameRuleInterface,
  gameContinue
} = require( '../utils' )
const { default: chalk } = require( 'chalk' )

const gameMap = ROCK_PAPER_SCISSORS_MAP.reduce((map, item)=>{
  map[item.value] = item.name
  return map
}, {})

/**
 * 剪刀石头布游戏
 */
async function game () {
  clear()
  printGameName( config )
  return gameMenu( {
    play: rockPaperScissors,
    rule: gameRule,
    back: backStartInterface
  } )
}

/** 游戏规则 */
async function gameRule () {
  return gameRuleInterface( config, {
    play: rockPaperScissors,
    back: game
  } )
}

async function rockPaperScissors () {
  const random = Math.ceil(Math.random() * 3)
  const choice = await input()
  console.log( `系统: ${ chalk.blue( gameMap[ random ] ) }` )
  console.log( `玩家: ${ chalk.blue( gameMap[ choice ] ) }` )
  if((random === 1 && choice === 2) || (random === 2 && choice === 3) || (random === 3 && choice === 1)) {
    console.log(chalk.green('恭喜你，你可真是个天才!'))
  } else {
    console.log(chalk.red('你输了，再接再厉!'))
  }
  return gameContinue( {
    play: () => {
      clear()
      printGameName( config )
      rockPaperScissors()
    },
    back: game
  } )
}

async function input () {
  const info = await inquirer.prompt({
    name: 'type',
    message: '请选择',
    type: 'list',
    choices: ROCK_PAPER_SCISSORS_MAP
  })
  return info.type
}

module.exports = {
  ...config,
  game
}