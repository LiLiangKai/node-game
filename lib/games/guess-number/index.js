/**
 * 猜数字
 * @author Hiya
 * @date 2020/09/10
 */

const clear = require('clear')
const inquirer = require('inquirer')
const config = require('./config')
const { 
  printGameName, 
  gameMenu, 
  backStartInterface, 
  gameRuleInterface,
  gameContinue
} = require('../utils')
const { default: chalk } = require( 'chalk' )

/** 界游菜单戏面 */
async function game () {
  clear()
  printGameName(config)
  return gameMenu({
    play: guessNumber,
    rule: gameRule,
    back: backStartInterface
  })
}

/** 游戏规则 */
async function gameRule () {
  return gameRuleInterface(config, {
    play: guessNumber,
    back: game
  })
}

/** 猜数字 */
async function guessNumber () {
  const level = await choseGameLevel()
  const random = Math.ceil(Math.random() * level)
  let curNum = await inputNumber()
  while(curNum !== random) {
    const tip = curNum < random ? '小了' : '大了'
    console.log(chalk.red(`${curNum} ${tip}`))
    curNum = await inputNumber()
  }
  if(curNum === random) {
    console.log(chalk.green(`恭喜才对了，${curNum}是正确数字！`))
    return gameContinue({
      play: () => {
        clear()
        printGameName(config)
        guessNumber()
      },
      back: game
    })
  }
}

/** 选择游戏难度 */
async function choseGameLevel () {
  const levelMap = {
    simple: 100,
    medium: 1000,
    hard: 10000
  }
  const gameLevel = [
    { name: '简单（数字范围: 1 ~ 100）', value: 'simple' },
    { name: '中等（数字范围: 1 ~ 1000）', value: 'medium' },
    { name: '困难（数字范围: 1 ~ 10000）', value: 'hard' }
  ]
  const info = await inquirer.prompt([{
    type: 'list',
    name: 'level',
    message: '请选择游戏难度',
    choices: gameLevel
  }])
  return levelMap[info.level]
}

async function inputNumber () {
  const info = await inquirer.prompt({
    name: 'number',
    message: '请输入数字: ',
    type: 'input',
    validate (value) {
      value = value.trim()
      if(!value) {
        return '不能为空'
      } 
      if(isNaN(parseInt(value))) {
        return '无效的数字'
      }
      return true
    }
  })
  return parseInt(info.number)
}

module.exports = {
  ...config,
  game
}