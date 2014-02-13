### Outline Generator Generator Modularization

Outline our constructor pattern; implement a generator generator. Programmatic
will create an AST for a function that will create an AST. Prorammatic is
generator that creates a generator. The generator created will produce an AST.

The end user can perform transitions on the generated AST to pretty print the
generated source and perform various optimizations or beautifications. Variable
hoisting or constant folding, for example.

At this point, I've only implemented a minimal parameterized template. The idea
now is to integrate Programmatic with Packet and consider how to invoke the API.

### Issue by Issue

 * Update descriptions. #58.
 * Upgrade Proof to 0.0.42. #57.
 * Move modules to root. #54.
 * Export named functions. #53.
 * Remove `esprima.t.js`. #52.
 * Rename `redux.js` to `index.js`. #51.
 * Delete old library. #50.
 * Rename to `static.t.js`. #49.
 * Implement two stage build, generator/generated. #48.
 * Covert ASTs of arrays to AST of AST. #47.
 * Create AST printing utility. #46.
 * AST of AST converter with identifier keys. #45.
 * Convert AST into AST of AST. #44.
 * Gather containment test structures into map. #43.
 * User Subordinate to test AST nodes. #42.
 * Generate a function from source. #41.
 * Add Escodegen as a dependency. #40.
 * Remove test of minified source. #39.
 * Create a `redux.js`. #38.
 * Add Esprima as a dependency. #37.
