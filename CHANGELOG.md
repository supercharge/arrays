# Changelog


## [3.2.0](https://github.com/supercharge/arrays/compare/v3.1.0...v3.2.0) - 2022-05-06

### Added
- support callback in `groupBy`
  ```ts
  const products = [
    { name: 'Macbook', price: 2500 },
    { name: 'Macbook', price: 3000 },
    { name: 'iPhone', price: 1000 }
  ]

  Arr.from(products).groupBy(product => {
    return product.name
  })

  // Macbook: [
  //   { name: 'Macbook', price: 2500 },
  //   { name: 'Macbook', price: 3000 }
  // ],
  // iPhone: [
  //   { name: 'iPhone', price: 1000 }
  // ]
  ```

### Updated
- bump dependency


## [3.1.0](https://github.com/supercharge/arrays/compare/v3.0.0...v3.1.0) - 2022-03-22

### Added
- `forEach`: perform a given `action` for each item in the array


## [3.0.0](https://github.com/supercharge/arrays/compare/v2.2.0...v3.0.0) - 2022-03-12

### Updated
- refine the array creation when using strings

### Breaking Changes
- using `Arr.from` with strings will wrap the string values into an array instead of creating an array of the string’s individual characters
- the changed string handling now properly resolves return values when using the `diff` method


## [2.2.0](https://github.com/supercharge/arrays/compare/v2.1.0...v2.2.0) - 2022-02-22

### Added
- `has(valueOrCallback)` method: added support for a callback function in the `has` method allowing users a refined handling to determine if a value is included in the array

### Updated
- bump dependency


## [2.1.0](https://github.com/supercharge/arrays/compare/v2.0.0...v2.1.0) - 2022-02-11

### Added
- `reduce()` method: runs a given reducer function on each item in the array and passes the accumulator to the next iteration
- `groupBy()` method: group the array by a given key


## [2.0.0](https://github.com/supercharge/arrays/compare/v1.2.0...v2.0.0) - 2022-01-21

### Added
- export the `Arr` full class
- improved typing for the `isArray` and `isNotArray` methods detecting whether the given input is an array
- `has()` method: determine whether the array contains a given value
- `isMissing()` method: determine whether the array is missing a given value
- `map()` method: returns a new array instance containing the results of applying a given transform function to each item in the array
- `flatMap()` method: returns a new array instance containing the results of applying a given transform function to each item in the array and flatten the mapped results one level deep

### Updated
- moved the static `from`, `isArray`, and `isNotArray` methods to the `Arr` class

### Breaking Changes
- `Arr.from` **does not** accept a mapping function anymore
    - I don’t use this feature and it caused troubles with the setup
    - a workaround to run a mapping function: `Arr.from(...items).map(…)`
- you must use `Arr.from(...items)` instead of `Arr(...items)`
    ```js
    // before
    import { Arr } from '@supercharge/arrays'
    const array = Arr([1, 2, 3])

    // now
    import { Arr } from '@supercharge/arrays'
    const array = Arr.from([1, 2, 3])


## [1.2.0](https://github.com/supercharge/arrays/compare/v1.1.0...v1.2.0) - 2022-01-12

### Added
- static `.from(iterable)` method: works like `Array.from`, transforms and wraps the given `iterable`
- `toArray()` method: returns the wrapped values as a plain JavaScript array (it’s an alias for `all()`)


## [1.1.0](https://github.com/supercharge/arrays/compare/v1.0.1...v1.1.0) - 2022-01-10

### Added
- `at(index)` method: returns the item at the given `index` or `undefined` if the index exceeds the array
- `find(predicate)`: returns the first item in the array matching the given `predicate` function, or `undefined` if no such item was found
- `findIndex(predicate)`: returns the index of the first element in the set where the given `predicate` function is `true`. Returns -1 otherwise
- `last(predicate?)`: returns the last array item when called without a predicate function. If you provide a predicate function this method is an alias for `findLast`
- `findLast(predicate)`: returns the last item in the set matching the given predicate function


## [1.0.1](https://github.com/supercharge/arrays/compare/v1.0.0...v1.0.1) - 2022-01-07

### Updated
- bump dependencies
- refined typings making sure the raw input type is resolved properly


## 1.0.0 - 2021-12-31

### Added
- `1.0.0` release 🚀 🎉
