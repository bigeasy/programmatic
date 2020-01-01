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
