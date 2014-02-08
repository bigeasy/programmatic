module.exports = require('proof')(function () {
    var util = require('util')

    return {
        dump: function (object) {
            return util.inspect(object, false, null)
        }
    }
})
