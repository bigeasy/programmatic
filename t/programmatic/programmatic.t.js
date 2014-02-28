var loop = 'var i = 0\n\
while (i < 10) {\n\
    i++\n\
}'

var f = 'function () {\n\
    var i = 0\n\
    while (i < 10) {\n\
        i++\n\
    }\n\
    console.log(i)\n\
}'

var blank = 'function () {\n\
    var i = 0\n\
    while (i < 10) {\n\
        i++\n\
    }\n\
\n\
    console.log(i)\n\
}'

require('proof')(3, function (equal) {
    var redux  = require('../..')
    var s = redux.concept, inner
    equal(inner = s('                   \n\
        var i = 0                       \n\
        while (i < 10) {                \n\
            ', 'i++', '                 \n\
        }                               \n\
    '), loop, 'indented')
    equal(s('                           \n\
        function () {                   \n\
            ', inner, '                 \n\
                                        \n\
            console.log(i)              \n\
        }                               \n\
    '), f, 'nested multi-line')
    equal(s('                           \n\
        function () {                   \n\
            ', inner, '                 \n\
            // __blank__                \n\
            console.log(i)              \n\
        }                               \n\
    '), blank, 'nested blank line')
})
