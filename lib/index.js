const clear = require('clear')
const chalk = require( 'chalk' )
const inquirer = require( 'inquirer' )

module.exports = main

async function main () {
  clear()
  await menu()
}

/** 游戏菜单界面 */
async function menu () {
  const menu = [{
    value: 'play', name: '选择游戏'
  }, {
    value: 'record', name: '游戏记录'
  }, {
    value: 'exit', name: '退出程序'
  }]
  console.log( chalk.green( '--------------------------- GAME -------------------------' ) )
  menu.map((m,i) => {
    console.log( chalk.green( `**                      ${i+1}.${m.name}                      **` ) )
  })
  console.log( chalk.green( '----------------------------------------------------------' ) )
  
  const info = await inquirer.prompt({
    type: 'list',
    name: 'type',
    message: '请选择',
    choices: menu
  })

  await exec(info.type)
}

async function exec (type) {
  switch(type) {
    case 'play':
      const startGame = require('./start')
      await startGame()
      return 
    case 'record':
      console.log( 'record' )
      await main()
      return
    default:
      return
  }
}

