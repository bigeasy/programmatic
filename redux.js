var __slice = [].slice

function dedent (line) {
    var $ = /^(\s*)(.*)$/.exec(line)
    return [ $[1], $[2].trim() ]
}

function appender () {
    var lines = []
    return function (offset, line) {
        if (arguments.length == 0) {
            return lines
        } else {
            if (arguments.length) {
                lines.push([ offset, line ])
            } else {
                return lines
            }
        }
    }
}

function redent (indent, source) {
    var lines = source.split(/\n/), i = 0, I = lines.length,
        append = appender(), spaces, split
    for (; i < I; i++) {
        if (/\S/.test(lines[i])) break
        else lines[i] = ''
    }
    spaces = dedent(lines[i])[0].length
    for (; i < I; i++) {
        if (/\S/.test(lines[i])) {
            split = dedent(lines[i])
            if (split[0].length > spaces) {
                indent++
            } else if (split[0].length < spaces) {
                indent--
            }
            spaces = split[0].length
            append(indent, split[1])
        }
    }
    return append()
}

exports.redent = redent

function rework (indent, source) {
    var lines = source.split(/\n/), i = 0, I = lines.length,
        gather = [], spaces, split
    for (; i < I; i++) {
        if (/\S/.test(lines[i])) break
        else lines[i] = ''
    }
    spaces = dedent(lines[i])[0].length
    for (; i < I; i++) {
        if (/\S/.test(lines[i])) {
            split = dedent(lines[i])
            if (split[0].length > spaces) {
                indent++
            } else if (split[0].length < spaces) {
                indent--
            }
            spaces = split[0].length
            append(indent, split[1])
        }
    }
    return gather
}

function delineate (lines) {
    return lines.split(/\n/).map(function (line) {
        var $ = /^(\s*)(.*)$/.exec(line)
        return [ $[1].length, $[2].trim() ]
    })
}

exports.concept = function () {
    var parent = -1, spaces = -1, source = [], indent = 0
    __slice.call(arguments).forEach(function (varg) {
        console.log({ parent: parent, spaces: spaces, indent: indent })
        if (parent > spaces) {
            indent++
        } else if (parent < spaces) {
            indent--
        }
        spaces = -1
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
        return new Array(line[0] * 4 + 1).join(' ') + line[1]
    }).join('\n')
}
