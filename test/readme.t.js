// [![Actions Status](https://github.com/bigeasy/programmatic/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/programmatic/actions)
// [![codecov](https://codecov.io/gh/bigeasy/programmatic/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/programmatic)
// [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
//
// A comparator function builder.
//
// | What          | Where                                             |
// | --- | --- |
// | Discussion    | https://github.com/bigeasy/programmatic/issues/1  |
// | Documentation | https://bigeasy.github.io/programmatic            |
// | Source        | https://github.com/bigeasy/programmatic           |
// | Issues        | https://github.com/bigeasy/programmatic/issues    |
// | CI            | https://travis-ci.org/bigeasy/programmatic        |
// | Coverage:     | https://codecov.io/gh/bigeasy/programmatic        |
// | License:      | MIT                                               |
//
// Programmatic installs from NPM.

// ## Overview

(function () {
    const { compare, raise, equal } = require('..')
}) ()

// We use the name "extant" on NPM because we want the first extant argument.
//
// ## Living `README.md`
//
// This `README.md` is also a unit test using the
// [Proof](https://github.com/bigeasy/proof) unit test framework. We'll use the
// Proof `okay` function to assert out statements in the readme. A Proof unit test
// generally looks like this.

require('proof')(12, async okay => {
    // ## Usage
    //
    // The `'extant'` module exports a single `coalesce` function.

    const $ = require('..')

    // Note that Extant is SQL's `COALESCE`. It returns the first non-null-like value,
    // that is the first value that is not `== null`, which would be `null` or
    // `undefined`. If there is no such argument it returns `null`.

    {
        okay('test')

        function testx (name, source) {
            const fs = require('fs')
            const path = require('path')

            const generated = path.resolve(__dirname, name + '.txt')

            try {
                const saved = fs.readFileSync(generated, 'utf8')
                okay(source, saved, name)
            } catch (e) {
                if (e.code != 'ENOENT') {
                    throw e
                }
                fs.writeFileSync(generated, source, 'utf8')
                okay(false, name)
            }

            return source
        }
    }

    // Programmatic is the equivalent of HEREDOCs from shell programming with support
    // for maintaining the indentation of interpolated snippets. It lets you generate
    // code with proper indentation in any language.

    {
        const hello = $(`
            hello, world
        `)

        okay(hello, 'hello, world', 'de-dented and trimmed')
    }

    // You cannot exclude the leading a trailing blank from the pattern.

    {
        const hello = $('hello, world')

        okay(hello, '', 'gets trimmed to oblivion')
    }

    // If you have multiple lines they are dedented to the least indented line.

    {
        const hello = $(`
                hello

            world
        `)

        okay(hello, [
            '    hello',
            '',
            'world'
        ].join('\n'), 'gets trimmed to oblivion')
    }

    // Before we go further, let's set a convention for tests so we can view the
    // generated output clearly and not have to parse the newlines in a JavScript
    // string literal.
    //
    // Here is a `test` function that will load a file from our test directory.

    const fs = require('fs')
    const path = require('path')

    function test (actual, name) {
        const expected = fs.readFileSync(path.resolve(__dirname, '..', name), 'utf8').split('\n')
        expected.pop()
        okay(actual.split('\n'), expected, name)
    }

    // Now when we want to show the output we'll write a test block and the follow it
    // with the contents of the files referenced in the test.

    {
        test($(`
            hello, world
        `), './test/hello.txt')
    }

    // If we have more than one `equalsFile` test in a test block we'll just repeat our
    // file contents blocks until we've referenced all the files in the test.

    {
        test($(`
            hello,

            world
        `), './test/hello-multi-line.txt')

        test($(`
                hello,

            world
        `), './test/hello-dedent.txt')
    }

    // Now that we understand and hopefully trust dedenting, let's use it to test
    // interpolation. Let's define a function called `HEREDOC`.

    function HEREDOC (string) {
        const lines = string.split('\n').map(line => {
            return /\S/.test(line)
                ? /^(\s*)(.*)$/.exec(line).slice(1, 3)
                : [ '', '' ]
        })
        lines.pop()
        lines.shift()
        const dedent = lines.filter(line => line[1] != '').reduce((dedent, line) => {
            return Math.min(dedent, line[0].length)
        }, 0xffffffff)
        return lines.map(line => {
            return line[1] == '' ? '' : line[0].substring(dedent) + line[1]
        }).join('\n')
    }

    // Let's test that `HEREDOC` works correctly.

    {
        okay(HEREDOC(`
            hello, world
        `), 'hello, world', 'HEREDOC trim and dedent')
        okay(HEREDOC(`
            hello,
            world
        `), 'hello,\nworld', 'HEREDOC trim and dedent multiline')
        okay(HEREDOC(`
            hello,

            world
        `), 'hello,\n\nworld', 'HEREDOC trim and dedent with blank line')
        okay(HEREDOC(`
                hello,

            world
        `), '    hello,\n\nworld', 'HEREDOC trim and dedent to least indented')
    }

    // This is probably better.

    (function () {
        function generate (count) {
            const loop = $(`
                for (let i = 0; i < ${count}; i++) {
                    value += i
                }
            `)

            return $(`
                function () {
                    let value = 0

                    `, loop, `

                    return value
                }
            `)
        }

        test(generate(3), './test/anon-loop-func.txt')
    }) ()
})

// You can run this unit test yourself to see the output from the various
// code sections of the readme.

// Contents of `./test/hello.txt`.

// Contents of `./test/hello-multi-line.txt`.

// Contents of `./test/hello-dedent.txt`.

// This `generate` function would emit the following code for `count = 3`.

// <div style="text-align: right">contents of: <code>./test/anon-loop-func.txt</code></div>
//
// I've used Programmatic to create generate some rather intense JavaScript code
// and found it to be rather maintainable. It's easy to see from the source what
// where the JavaScript code is generated and the varible bits stand out. With ES6
// string templates it's even easier to read than before when I had to `+` a bunch
// of strings together. Ultimately easier than using escodgen or similar for my
// purposes. Far more lightweight. Programmatic is a single 75 line Node.js module.
//
// Programmatic as a simple API. Most of Programmatic's logic is in the rules. Easy
// enough to follow, but also, easy enough to forget.
//
// **Rule 1**: The arguments to Programmatic alternate between a literal value and
// an interpolated value starting with a literal value and ending with a literal
// value.
//
// In the following example the `generate` function calles Programmatic with a
// literal followed by a variable for the function body, followed by another
// literal. The indentation from the JavaScript template string is stripped so that
// the keyword `function` in the generated source is is flush left, but the body
// variable is indented by the four spaces relative to the keyword `function` in
// the string template.

// The output program emits the following.

// _TK_ Good news is that you can use interpolation in your literals, so if you
// have variables that are inline instead of indented, use interpolation.
//
// _TK_ Here is where you can mention the new snuggle mode. **TODO** How hard can I
// snuggle?
//
// **Rule 2**: The very first line and the very last line are discarded. You won't
// have to think about this rule because it is just the natural way in which
// Programmatic is expressed in your code.
//
// _TK_: Repeat the example above.
//
// **Rule 3**: Programmatic uses the left most character of all the literals to
// determine how far to dedent the JavaScript source string. _TK_
//
// **Rule 4**: Variables must already be completely dedented.
//
// **Rule 5**: `null` variables are not printed and delete their line.
//
// **Rule 6**: No white space in blank lines. Maybe I'll accommodate people who
// can't control their editors someday, but until then... And wait, why does it
// even matter really? Check to see if it doesn't and if it doesn't then we only
// have five rules.

// In the above the call to `console.log(body)` should emit the following to the
// console. The variable does not include indentation.

// Programmatic has removed the leading spaces from the string literals in the
// JavaScript code

// The first string is used to set the dedent for the entire generated Programmatic
// block. The whitespace before `function () {` will be subtracted from every line
// in the Programmatic block.
//
// The leading whitespace of the last line in each literal string is used to set
// the indent level for subsequent block variable. The first literal containing
// `function () {` continues after the newline and the leading whitespace of the
// next line is used to indent `consts`. Every line in `consts` will have four
// spaces prepended. Twelve spaces are on that last line, but eight spaces are
// deducted because of the dedent set by the line of the first literal
// `function () {`.
//
// You can also call functions, of course, but the idea is that you're alternating
// a string literal with a Programmatic generated block. Here we imagine that
// `options` is an object with various properties and the three functions called
// generate a block using Programmatic.

// Rule two, the very first line and very last line are always discarded.

// In the Programmatic calls above the very first line is both calls is `"\n"` and
// the very last line in both calls is `"    "`. They are always discarded.
//
// We discard the very first line. We use the second line of every Programmatic
// call to determine the dedent.
//
// The above will generate...

// It will not generate...

// Rule three, arguments to the Programmatic format function are always literal,
// variable, with zero or more additional pairs of literal and variable, always
// ending in a literal.

function generate (consts, lets, body) {
    return $(`
        `, consts, `

        `, lets, `

        `, body, `
    `)
}

// You can't do the following. You always have to add that last literal even though
// it will ultimately result in nothing because the last line is discarded so it is
// only a single line with nothing.

function generate (variable, body) {
    return $(`
        `, variables, `

        `, body)
}

// Rule four, where literals should always end with a line of only whitespace.
//
// The following generates unexpected output. That last line of the literal is all
// about whitespace, determining the indent for the interpolated block.

function generate (consts, lets, body) {
    return $(`
        const `, consts, `

        let `, lets, `

        return `, body, `
    `)
}

// If you really want to interpolate text, use standard JavaScript string
// interpolation. The following might be something you'd actually write with
// Programmatic.

function generate (consts, lets, body) {
    return $(`
        const ${consts.join(', ')}

        let ${lets.join(', ')}

        `, body, `
    `)
}

// Rule five, literals should always start with a newline. Do not put text on that
// first line of a literal.

function generate (consts, lets, body) {
    return $(`
        `, consts, `

        `, lets, `

        `, body, ` == 0
    `)
}

// Again, if you want to interpolate strings just use standard string
// interpolation.
//
// Rule six, null variables will delete any subsequent blank lines.

// When we call the `generate` function with a `null` value for `consts`, the
// `consts` block will not be displayed and the blank lines following are deleted.
//
// The above will generate...

// And not...

// And certainly not...

// Rule seven, no whitespace in blank lines.
//
// For a line to be a blank line it must be an empty line. Not spaces. Set your
// text editor to warn you about trailing whitespace or have `git` nag you when you
// commit. TK `git` whitespace nag recipe.
