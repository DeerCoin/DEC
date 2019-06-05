'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API:'"/api"',
	// COCOS:'"http://192.168.88.60:7456/build/"',
	COCOS:'"http://www.o22zw.com/kjmain"',
  VER_API:'"http://hbuilder.573q3.cn/hothbuilder.json"',
  WALLET:'"1FAiEqAg2txQenxo2zSaGet715bRH8c7VY"',
  IMTOKEN:'"0x127431A15891F6C99F6B89f1872CB555125AfdFa"'
})
