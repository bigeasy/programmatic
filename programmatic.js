module.exports = function (...vargs) {
    const stop = typeof vargs[0] == 'number' ? vargs.shift() : 1
    let offset = null, dedent = null, indent = '', ff = -1, rewind, literal = false, i = -1
    const source = []
    while (vargs.length != 0) {
        i++
        literal = i % 2 == 0
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
        if (i == 0) {
            offset = dedent = Math.floor(lines.filter(line => {
                return line[0] != '' || line[1] != ''
            })[0][0].length / stop) * stop
        } else if (!literal) {
            dedent = 0
            indent = source.pop()[0]
        } else {
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
