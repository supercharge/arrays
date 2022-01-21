# Changelog


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
