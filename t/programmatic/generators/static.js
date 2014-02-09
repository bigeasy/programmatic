module.exports = function () {
    var $ = require('programmatic/builder')([{
                type: 'Identifier',
                name: 'value'
            }]);
    $.push({
        type: 'ReturnStatement',
        argument: {
            type: 'BinaryExpression',
            operator: '+',
            left: {
                type: 'Identifier',
                name: 'value'
            },
            right: {
                type: 'Literal',
                value: 1
            }
        }
    });
    return $.create()
};