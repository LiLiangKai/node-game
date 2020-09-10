/**
 * 组件库本地服务
 */

const chalk = require( 'chalk' )
const program = require( 'commander' )
const pkg = require( '../package.json' )
const game = require('./index')

program.version( pkg.version ).usage( '<command> [options]' )

// program
//   .option( '-p, --port <number>', '端口', 8008 )

// // 创建模块命令
program
  .command( 'start [name]' )
  .description( '开始游戏' )
  .action( ( name ) => {
    require( './start' )( { name } )
  } )

// 未知命令
program.arguments( '<command>' ).action( cmd => {
  program.outputHelp()
  console.log( `  ` + chalk.red( `Unknown command ${ chalk.yellow( cmd ) }.` ) )
  console.log()
} )

program.parse( process.argv )

if ( !process.argv.slice( 2 ).length ) {
  game()
}