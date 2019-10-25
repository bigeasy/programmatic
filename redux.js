module.exports = function (...vargs) {
    const stop = typeof vargs[0] == 'number' ? vargs.shift() : 1
    let offset = null, dedent = null, indent = ''
    const source = []
    const sources = [ source ]
    for (let i = 0, I = vargs.length; i < I; i++) {
        const varg = vargs[i]
        const lines = varg.split(/\n/).map((line) => /^(\s*)(.*)$/.exec(line).slice(1, 3))
        if (i == 0) {
            lines.shift()
        }
        if (i == I - 1) {
            lines.pop()
        }
        if (i == 0) {
            offset = dedent = Math.floor(lines.filter(line => {
                return line[1] != ''
            })[0][0].length / stop) * stop
        } else if (i % 2 == 1) {
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
