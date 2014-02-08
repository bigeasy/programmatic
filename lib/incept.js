var esprima = require('esprima')

module.exports = function (object, dump) {
    return esprima.parse('(' + JSON.stringify(object) + ')').body[0].expression
}
