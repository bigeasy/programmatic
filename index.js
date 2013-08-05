var __slice = [].slice

function Source (parent) {
    this.source = []
    this.named = {}

    if (parent) {
       this.named.__proto__ = parent.named
    }
}


Source.prototype.push = function (block) {
    if (typeof block == 'function') this.pushBlock(block)
    else this.source.push(function () { return String(block) })
}

Source.prototype.pushBlock = function (block) {
    var source = String(block)
    var parameters = /^function \(([^)]*)\) {/.exec(source)[1].trim()
    parameters = parameters ? parameters.split(/, /) : []
    if (/\n/.test(source)) {
        source = source.split(/\n/).slice(1, -1)
        source.push('')
    } else {
        source = [ /^function \([^)]*\) {(.*)}$/.exec(source)[1].trim() ]
    }
    var spaces = Number.MAX_VALUE
    source.forEach(function (line) {
        if (/\S/.test(line)) {
            spaces = Math.min(spaces, line.length - line.replace(/^\s+/, '').length)
        }
    })
    source = source.map(function (line) {
        if (/\S/.test(line)) {
            return line.substring(spaces)
        } else {
            return ''
        }
    })
    var rest = source.join('\n')
    source = [ '' ]
    while (rest) {
        var $ = /^((?:[^,\\'"\/$]|\\.|(["'])(?:[^\\\1]|\\.)*\2)*)([^\u0000]*)/.exec(rest)
        var esc = $[3]
        source[0] += $[1]
        if (esc.length < 2) {
            source[0] += esc
            rest = ''
        } else {
            switch (esc[2]) {
            case '$':
                source[0] += esc[0]
                rest = esc.substring(2)
                break
            case '(':
                // honkin' regular expression.
                break
            default:
                if ($ = /^\$([_\w][_$\w\d]*)([^\u0000]*)/.exec(esc)) {
                    rest = $[2]
                    source.unshift('', (function (name) {
                        return function () {
                            return this.named[name].compile()
                        }
                    })($[1]))
                } else {
                    source[0] += esc[0]
                    rest = esc.substring(1)
                }
                break
            }
        }
    }
    source = source.reverse().map(function (snippet, index) {
        if (!(index % 2)) {
            return function () { return snippet }
        } else {
            return snippet
        }
    })
    this.source.push.apply(this.source, source)
}

function indent (source, trim) {
    source = source.split(/\n/).map(function (line) {
        return /\S/.test(line) ? '    ' + line : line
    })
    if (trim && source[source.length - 1] == '') {
        source.pop()
    }
    return source.join('\n')
}

Source.prototype.compile = function () {
    var source = []
    this.source.forEach(function (snippet) {
        source.push(snippet.call(this))
    }, this)
    return source.join('')
}

Source.prototype.compiler = function () {
    var compiler =  function () {
        var parameters = __slice.call(arguments)
        return Function.apply(Function, parameters.concat(indent(this.compile(), true)))
    }.bind(this)
    compiler.toString = this.compile.bind(this)
    return compiler
}

function createSource () {
    var source = new Source
    return function () {
        var vargs = __slice.call(arguments)
        if (vargs.length == 2) {
            var name = vargs.shift()
            var block = vargs.shift()
            source.named[name] = new Source(source)
            source.named[name].push(block)
        } else if (vargs.length) {
            source.push(vargs.shift())
        } else {
            return source.compiler()
        }
    }
}

module.exports.createSource = createSource
