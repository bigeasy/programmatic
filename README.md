[![Actions Status](https://github.com/bigeasy/programmatic/workflows/Node%20CI/badge.svg)](https://github.com/bigeasy/programmatic/actions)
[![codecov](https://codecov.io/gh/bigeasy/programmatic/branch/master/graph/badge.svg)](https://codecov.io/gh/bigeasy/programmatic)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comparator function builder.

| What          | Where                                             |
| --- | --- |
| Discussion    | https://github.com/bigeasy/programmatic/issues/1  |
| Documentation | https://bigeasy.github.io/programmatic            |
| Source        | https://github.com/bigeasy/programmatic           |
| Issues        | https://github.com/bigeasy/programmatic/issues    |
| CI            | https://travis-ci.org/bigeasy/programmatic        |
| Coverage:     | https://codecov.io/gh/bigeasy/programmatic        |
| License:      | MIT                                               |


```
npm install programmatic
```
Programmatic is the equivalent of HEREDOCs from shell programming with support
for maintaining the indentation of interpolated snippets. It lets you generate
code with proper indentation in any language.

```javascript
function generate (count) {
    const loop = $(`
        for (int i = 0; i < ${count}; i++) {
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
```

This `generate` function would emit the following code for `count = 3`.

```javascript
function () {
    let value = 0

    for (let i = 0; i < 3; i++) {
        value += i
    }

    return value
}
```

I've used Programmatic to create generate some rather intense code. With ES6
string templates, I've found that the code generation has actually been easy to
read and maintain. Ultimately easier than using escodgen or similar for my
purposes. Far more lightweight. Programmatic is a single 40 line Node.js module.

Programmatic as a simple API. Most of Programmatic's logic is in the rules. Easy
enough to follow, but also, easy enough to forget.

Rule one, Programmatic uses interpolated literals for indentation, variables for
inserting property formatted blocks. The variables are supposed to be blocks
you've created with an invocation of Programmatic. Stray from this and you'll
get the unexpected.

```javasript
function generate (consts, lets, body) {
    return $(`
        function () {
            `, consts, `

            `, lets, `

            `, body, `
        }
    `)
}
```

The first string is used to set the dedent for the entire generated Programmatic
block. The whitespace before `function () {` will be subtracted from every line
in the Programmatic block.

The leading whitespace of the last line in each literal string is used to set
the indent level for subsequent block variable. The first literal containing
`function () {` continues after the newline and the leading whitespace of the
next line is used to indent `consts`. Every line in `consts` will have four
spaces prepended. Twelve spaces are on that last line, but eight spaces are
deducted because of the dedent set by the line of the first literal
`function () {`.

You can also call functions, of course, but the idea is that you're alternating
a string literal with a Programmatic generated block. Here we imagine that
`options` is an object with various properties and the three functions called
generate a block using Programmatic.

```javasript
function generate (options) {
    return $(`
        function () {
            `, consts(options), `

            `, lets(options), `

            `, body(options), `
        }
    `)
}
```

Rule two, the very first line and very last line are always discarded.

```javasript
function generate () {
    const lets = $(`
        let i = 3
        let array = []
    `)
    return $(`
        function () {
            `, lets, `

            while (--i != 0) {
                array.push(i)
            }

            return array
        }
    `)
}
```

In the Programmatic calls above the very first line is both calls is `"\n"` and
the very last line in both calls is `"    "`. They are always discarded.

We discard the very first line. We use the second line of every Programmatic
call to determine the dedent.

The above will generate...

```javascript
function () {
    let i = 3
    let array = []

    while (--i != 0) {
        array.push(i)
    }

    return array
}
```

It will not generate...

```javascript

function () {

    let i = 3
    let array = []


    while (--i != 0) {
        array.push(i)
    }

    return array
}

```

Rule three, arguments to the Programmatic format function are always literal,
variable, with zero or more additional pairs of literal and variable, always
ending in a literal.

```javasript
function generate (consts, lets, body) {
    return $(`
        `, consts, `

        `, lets, `

        `, body, `
    `)
}
```

You can't do the following. You always have to add that last literal even though
it will ultimately result in nothing because the last line is discarded so it is
only a single line with nothing.

```javasript
function generate (variable, body) {
    return $(`
        `, variables, `

        `, body)
}
```

Rule four, where literals should always end with a line of only whitespace.

The following generates unexpected output. That last line of the literal is all
about whitespace, determining the indent for the interpolated block.

```javasript
function generate (consts, lets, body) {
    return $(`
        const `, consts, `

        let `, lets, `

        return `, body, `
    `)
}
```

If you really want to interpolate text, use standard JavaScript string
interpolation. The following might be something you'd actually write with
Programmatic.

```javasript
function generate (consts, lets, body) {
    return $(`
        const ${consts.join(', ')}

        let ${lets.join(', ')}

        `, body, `
    `)
}
```

Rule five, literals should always start with a newline. Do not put text on that
first line of a literal.

```javasript
function generate (consts, lets, body) {
    return $(`
        `, consts, `

        `, lets, `

        `, body, ` == 0
    `)
}
```

Again, if you want to interpolate strings just use standard string
interpolation.

Rule six, null variables will delete any subsequent blank lines.

```javasript
function generate (consts, lets, body) {
    return $(`
        function () {
            `, consts, `

            `, lets, `

            `, body, `
        }
    `)
}

const lets = $(`
    let i = 3
    let sum = 0
`)

const body = $(`
    while (i != 0) {
        sum += i--
    }

    return sum
`)

console.log(generate(null, lets, body))
```

When we call the `generate` function with a `null` value for `consts`, the
`consts` block will not be displayed and the blank lines following are deleted.

The above will generate...

```javascript
function () {
    let i = 3
    let sum = 0

    while (i != 0) {
        sum += i--
    }

    return sum
}
```

And not...


```javascript
function () {

    let i = 3
    let sum = 0

    while (i != 0) {
        sum += i--
    }

    return sum
}
```

And certainly not...

```javascript
function () {
    null

    let i = 3
    let sum = 0

    while (i != 0) {
        sum += i--
    }

    return sum
}
```

Rule seven, no whitespace in blank lines.

For a line to be a blank line it must be an empty line. Not spaces. Set your
text editor to warn you about trailing whitespace or have `git` nag you when you
commit. TK `git` whitespace nag recipe.
