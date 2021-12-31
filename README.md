<div align="center">
  <a href="https://superchargejs.com">
    <img width="471" style="max-width:100%;" src="https://superchargejs.com/images/supercharge-text.svg" />
  </a>
  <br/>
  <br/>
  <p>
    <h3>Arrays</h3>
  </p>
  <p>
    Array utilities for JavaScript and Node.js
  </p>
  <br/>
  <p>
    <a href="#installation"><strong>Installation</strong></a> ·
    <a href="#Docs"><strong>Docs</strong></a> ·
    <a href="#usage"><strong>Usage</strong></a>
  </p>
  <br/>
  <br/>
  <p>
    <a href="https://www.npmjs.com/package/@supercharge/arrays"><img src="https://img.shields.io/npm/v/@supercharge/arrays.svg" alt="Latest Version"></a>
    <a href="https://www.npmjs.com/package/@supercharge/arrays"><img src="https://img.shields.io/npm/dm/@supercharge/arrays.svg" alt="Monthly downloads"></a>
  </p>
  <p>
    <em>Follow <a href="http://twitter.com/marcuspoehls">@marcuspoehls</a> and <a href="http://twitter.com/superchargejs">@superchargejs</a> for updates!</em>
  </p>
</div>

---

## Introduction
The `@supercharge/arrays` package provides chainable array utilities for Node.js and JavaScript. It’s a wrapper around JavaScript arrays providing useful methods like `.isEmpty()`, `.size()`, `.flatMap()`, `.contains()`, and many more.


## Installation

```
npm i @supercharge/arrays
```


## Docs
Find all the [details for `@supercharge/arrays` in the extensive Supercharge docs](https://superchargejs.com/docs/arrays).


## Usage
Using `@supercharge/arrays` is pretty straightforward. The package exports a function wrapping an array or individual items as an argument. You can then fluently chain methods interacting with your data:

```js
const { Arr } = require('@supercharge/arrays')

const hasItemsGreaterTen = Arr([1, 2, 3, 4, 5, 6])
  .map(value => value * 2) // [2, 4, 6, 8, 10, 12]
  .filter(value => value > 10) // [12]
  .isNotEmpty() // true


// Only methods, no properties
Arr([1, 2, 3]).length() // 3


// Supports callbacks for `.includes`:
Arr([1, 2, 3]).includes(value => {
  return value > 2
})
```

Every method in the chain returns a `@supercharge/array` instance. This way, you can chain further methods without leaving the fluent interface. Call `.all()` to retrieve the plain JavaScript array.


## Contributing
Do you miss a function? We very much appreciate your contribution! Please send in a pull request 😊

1.  Create a fork
2.  Create your feature branch: `git checkout -b my-feature`
3.  Commit your changes: `git commit -am 'Add some feature'`
4.  Push to the branch: `git push origin my-new-feature`
5.  Submit a pull request 🚀


## License
MIT © [Supercharge](https://superchargejs.com)

---

> [superchargejs.com](https://superchargejs.com) &nbsp;&middot;&nbsp;
> GitHub [@supercharge](https://github.com/supercharge) &nbsp;&middot;&nbsp;
> Twitter [@superchargejs](https://twitter.com/superchargejs)
