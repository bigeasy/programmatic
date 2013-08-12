var __slice = [].slice

var Source = {}

Source.push = function (block) {
    var source = String(block)
    var declarations
    var inline = true

    if (typeof block == 'function' && block.push !== Source.push) {
      if (/\n/.test(source)) {
          source = source.split(/\n/).slice(1, -1)
          source.push('')
          inline = false
      } else {
          source = [ /^function\s*\([^)]*\)\s*{(.*)}$/.exec(source)[1].trim() ]
      }
    } else {
      source = String(source).split(/\n/)
      inline = source.length == 1
    }

    // this is only going to happen after minification.
    if (this.source.length && (inline || this.nonewline)) {
        this.source.push(function () { return '\n' })
    }
    this.nonewline = /\S/.test(source[source.length - 1])
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
        // todo: smaller if this is the only regular expression?
        var $ = /^((?:[^'"\/\\$]|\\.|(["'])(?:[^\\\1]|\\.)*\2)*)([^\u0000]*)/.exec(rest)
        var esc = $[3]
        source[0] += $[1]
        if (esc.length < 2) {
            source[0] += esc
            rest = ''
        } else {
            switch (esc[1]) {
            case '$':
                source[0] += esc[0]
                rest = esc.substring(2)
                break
            case '.':
                rest = esc.replace(/^\$\.var\(/, '')
                var depth = 1
                $[1] = $[3] = declarations = ''
                while (depth) {
                    declarations += $[1] + $[3]
                    $ = /^((?:[^'"\/\\)(]|\\.|(["'])(?:[^\\\1]|\\.)*\2)*)([)(])([^\u0000]*)/.exec(rest)
                    if ($[3] == ')') depth--
                    else if ($[3] == '(') depth++
                    rest = $[4]
                }
                if (source[0].length && !/[;\n]\s+$/.test(source[0])) {
                    rest += '\n'
                }
                rest = 'var ' + declarations + $[1] + rest
                break
            default:
                if ($ = /^\$([_\w][_$\w\d]*)([^\u0000]*)/.exec(esc)) {
                    rest = $[2]
                    var f = (function (name) {
                        return function () {
                            this.blocks[name] = _createSource(this.blocks, this.objects, __slice.call(arguments))
                        }
                    })($[1])
                    this.objects.forEach(function (object) {
                        object['$' + $[1]] = f
                    })
                    source.unshift('', (function (name) {
                        return function () {
                            return String(this.blocks[name])
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

function indent (source, spaces, trim) {
    source = source.split(/\n/).map(function (line) {
        return /\S/.test(line) ? spaces + line : line
    })
    while (trim && source[0] == '') {
        source.shift()
    }
    while (trim && source[source.length - 1] == '') {
        source.pop()
    }
    return source.join('\n')
}

Source.toString = function () {
    var source = []
    var previous, current
    this.source.forEach(function (snippet, index) {
        current = snippet.call(this)
        if (index % 2) {
            var $ = /\n([\t ]+)$/.exec(previous)
            if ($ && /\n/.test(current)) {
                var spaces = $[1]
                current = indent(current, spaces, true)
                current = current.substring(spaces.length)
            }
        }
        source.push(current)
        previous = current
    }, this)
    return source.join('')
}

Source.define = function () {
    var parameters = __slice.call(arguments)
    return 'function (' + parameters.join(', ') + ') {\n' +
      indent(this.toString(), '    ', true) + '\n' +
   '}'
}

Source.compile = function () {
    var parameters = __slice.call(arguments)
    return Function.apply(Function, parameters.concat(indent(this.toString(), '    ', true)))
}

function createSource () {
    return _createSource({}, [], __slice.call(arguments))
}

function _createSource (_blocks, _objects, blocks) {
    var source = function (block) {
        return source.push(block)
    }

    source.source = []
    source.objects = _objects.concat(source)
    source.blocks = _blocks

    for (var method in Source) {
        source[method] = Source[method]
    }

    blocks.forEach(function (block) { source.push(block) })

    return source
}

module.exports = createSource
