exports.parameter = function (value) {
    var $ = require('programmatic/builder')([], { value: value });
    $.push({
        type: 'ReturnStatement',
        argument: {
            type: 'Identifier',
            name: 'value'
        }
    });
    return $.create()
};