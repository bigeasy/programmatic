var __slice = [].slice

function delineate (lines) {
    return lines.split(/\n/).map(function (line) {
        var $ = /^(\s*)(.*)$/.exec(line)
        return [ $[1].length, $[2].trim() ]
    })
}

exports.concept = function () {
    var parent = -1, spaces = -1, source = [], indent = 0, stashed = -1
    __slice.call(arguments).forEach(function (varg) {
        if (parent == -1) {
            spaces = stashed
        } else {
            if (parent > spaces) {
                indent++
            } else if (parent < spaces) {
                indent--
            }
            stashed = parent
            spaces = -1
        }
        delineate(varg).forEach(function (line) {
            if (line[1]) {
                if (spaces != -1) {
                    if (line[0] > spaces) {
                        indent++
                    } else if (line[0] < spaces) {
                        indent--
                    }
                }
                source.push([ indent, line[1] ])
                spaces = line[0]
                parent = -1
            } else {
                parent = line[0]
            }
        })
    })
    return source.map(function (line) {
        if (/__blank__/.test(line)) {
            return ''
        } else {
            return new Array(line[0] * 4 + 1).join(' ') + line[1]
        }
    }).join('\n')
}
