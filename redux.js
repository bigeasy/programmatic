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
