const clear = require('clear')
const chalk = require('chalk')
const inquirer = require('inquirer')
const { GAME_MENU, GAME_RULE_MENU, GAME_CONTINUE } = require('./constant')

/**
 * 打印游戏名
 * @param {{name:string; key:string; rules: string[]}} gameConfig 
 */
function printGameName (gameConfig = {}) {
  const { name } = gameConfig
  console.log(`游戏 ${chalk.green(name)}`)
}

/**
 * 打印游戏信息
 * @param {{name:string; key:string; rules: string[]}} gameConfig
 */
function printGameRule (gameConfig = {}) {
  const { rules = [] } = gameConfig
  printGameName(gameConfig)
  console.log('游戏规则')
  if(!rules.length) {
    console.log(chalk.red('暂无规则'))
  } else {
    rules.map((rule, i) => {
      console.log(chalk.green(`${i+1}.${rule}`))
    })
  }
}

/**
 * 游戏菜单
 * @param {{play: Function; rule: Function back: Function}} cbs 
 */
async function gameMenu (cbs = {}) {
  const info = await inquirer.prompt([{
    type: 'list',
    name: 'type',
    message: '请选择',
    choices: GAME_MENU
  }])
  const cb = cbs[ info.type ]
  if(typeof cb === 'function') {
    return cb()
  }
} 

/** 返回游戏选择界面 */
async function backStartInterface () {
  const startInterface = require('../start')
  return startInterface()
}

/**
 * 游戏规则界面
 * @param {{name:string; key:string; rules: string[]}} gameConfig
 * @param {{play: Function; back: Function}} cbs
 */
async function gameRuleInterface (config, cbs) {
  clear()
  printGameRule(config)

  const info = await inquirer.prompt( [ {
    type: 'list',
    name: 'type',
    message: '请选择',
    choices: GAME_RULE_MENU
  } ] )
  const cb = cbs[ info.type ]
  if ( typeof cb === 'function' ) {
    return cb()
  }
}

/**
 * 结束游戏菜单
 * @param {{play: Function; back: Function}} cbs
 */
async function gameContinue (cbs) {
  const info = await inquirer.prompt( [ {
    type: 'list',
    name: 'type',
    message: '游戏结束，请选择',
    choices: GAME_CONTINUE
  } ] )
  const cb = cbs[ info.type ]
  if ( typeof cb === 'function' ) {
    return cb()
  }
}

module.exports = {
  printGameName,
  printGameRule,
  gameMenu,
  backStartInterface,
  gameRuleInterface, 
  gameContinue
}