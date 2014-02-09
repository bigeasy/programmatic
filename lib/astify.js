var esprima = require('esprima')
var incept = require('./incept')
var util = require('util')
var program = esprima.parse(process.argv[2])

console.log(util.inspect(program, false, null))
