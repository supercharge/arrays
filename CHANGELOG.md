# Changelog


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
