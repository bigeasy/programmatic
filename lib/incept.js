var esprima = require('esprima')

function literally (object) {
    object.properties.forEach(function (property) {
        property.key.type = 'Identifier'
        property.key.name = property.key.value

        if (property.value.type == 'ObjectExpression') {
            literally(property.value)
        }

        delete property.key.value
    })
    return object
}

module.exports = function (object, dump) {
    return literally(esprima.parse('(' + JSON.stringify(object) + ')').body[0].expression)
}
