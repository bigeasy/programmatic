require('proof')(1, function (equal) {
    var fs = require('fs'), path = require('path'), redux = require('../../redux')
    var escodegen = require('escodegen')

    var body = fs.readFileSync(path.join(__dirname, 'fixtures', 'minimal.p.js'), 'utf8')
    var result = redux.generate(body).shift()
    console.log(result[1])
    console.log(JSON.stringify(result[0].concat(escodegen.generate(result[1]))))
    var f = Function.apply(Function, result[0].concat(escodegen.generate(result[1])))
    equal(f(1), 1, 'generated')
})
