var __slice = [].slice

function Source () {
    this._snippets = []
}

var $ = /^((?:[^,\\'"\s\/()$]|\\.|(["'])(?:[^\\\1]|\\.)*\2)*)(.*)/

Source.prototype.push = function (block) {
    var source = String(block).split('\n')
    var parameters = /^function \(([^)]*)\) {$/.exec(source[0])[1].trim()
    parameters = parameters ? parameters.split(/, /) : []
    source.shift()
    source.pop()
    console.log(parameters, source)
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
    source.forEach(function (line) {
        this._snippets.push([ line ])
    }, this)
}

function indent (source) {
    return source.map(function (line) {
        return '    ' + line
    })
}

Source.prototype.compiler = function () {
    return function () {
        var parameters = __slice.call(arguments)
        var source = []
        this._snippets.forEach(function (snippet) {
            source.push(snippet.join(''))
        })
        source = indent(source)
        return Function.apply(Function, parameters.concat(source.join('\n')))
    }.bind(this)
}

function createSource () {
    var source = new Source
    return function () {
        var vargs = __slice.call(arguments)
        if (vargs.length) {
            source.push(vargs.shift())
        } else {
            return source.compiler()
        }
    }
}

module.exports.createSource = createSource
