var loop = 'var i = 0\n\
while (i < 10) {\n\
    i++\n\
}'

require('proof')(1, function (equal) {
    var redux  = require('../../redux')
    var s = redux.concept
    equal(s('                     \n\
        var i = 0                       \n\
        while (i < 10) {                \n\
            ', s('i++'), '              \n\
        }                               \n\
    '), loop, 'indented')
})
