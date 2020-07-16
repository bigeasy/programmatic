module.exports = function (...vargs) {
    const stop = typeof vargs[0] == 'number' ? vargs.shift() : 1, seek = vargs.slice()
    let dedent = 0, indent = '', ff = -1, rewind = 0, literal = false, i = -1, j = -1, offset = 0xffffffff
    while (seek.length != 0) {
        i++
        const lines = seek.shift().split(/\n/).map(line => /^(\s*)(.*)$/.exec(line).slice(1, 3))
        if (seek.length == 0) {
            lines.pop()
        }
        lines.shift()
        for (const line of lines) {
            if (line[0] != '' || line[1] != '') {
                dedent = offset = Math.min(offset, Math.floor(line[0].length / stop) * stop)
            }
        }
        if (typeof seek[0] == 'number') {
            seek.shift()
        }
        seek.shift()
        if (typeof seek[0] == 'number') {
            seek.shift()
        }
    }
    const source = []
    while (vargs.length != 0) {
        j++
        literal = j % 2 == 0
        if (!literal) {
            rewind = typeof vargs[0] == 'number' ? vargs.shift() : 0
        }
        const varg = vargs.shift()
        if (!literal) {
            ff = typeof vargs[0] == 'number' ? vargs.shift() : 0
        }
        if (!literal) {
            if (varg == null) {
                source.pop()
                while (rewind++ != 0) {
                    source.pop()
                }
                continue
            } else {
                ff = 0
            }
        }
        const lines = varg.split(/\n/).map(line => /^(\s*)(.*)$/.exec(line).slice(1, 3))
        if (vargs.length == 0) {
            lines.pop()
        }
        while (ff != 0) {
            lines.shift()
            ff++
        }
        if (!literal) {
            dedent = 0
            indent = source[source.length - 1][0]
            if (source[source.length - 1][1] != '') {
                source[source.length - 1][1] += lines.shift()[1]
            } else {
                source.pop()
            }
        } else if (j != 0) {
            if (lines[0][1] != '') {
                source[source.length - 1][1] += lines[0][1]
            }
            lines.shift()
            dedent = offset
            indent = ''
        }
        for (const line of lines) {
            source.push([ indent + line[0].substr(dedent), line[1] ])
        }
    }
    return source.map(line => line[1] == '' ? '' : line.join('')).join('\n')
}
