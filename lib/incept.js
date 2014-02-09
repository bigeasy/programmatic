var esprima = require('esprima')

function literally (object) {
    if (typeof object == 'object') {
        if (object.properties) object.properties.forEach(function (property) {
            property.key.type = 'Identifier'
            property.key.name = property.key.value

            literally(property.value)

            delete property.key.value
        })
        if (object.elements) object.elements.forEach(function (element) {
            literally(element)
        })
    }
    return object
}

module.exports = function (object, dump) {
    return literally(esprima.parse('(' + JSON.stringify(object) + ')').body[0].expression)
}
