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
The `@supercharge/arrays` package provides chainable array utilities for Node.js and JavaScript. It’s a wrapper around JavaScript arrays providing useful methods like `.isEmpty()`, `.length()`, `.flatMap()`, `.contains()`, and many more.


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

const users = Arr.from([])

users.isEmpty()
// true

users
  .push({ id: 1, name: 'Marcus' })
  .push({ id: 2, name: 'Norman' })
  .push({ id: 3, name: 'Christian' })

users.isNotEmpty()
// true

users.length()
// 3

const usernamesArray = users
  .map(user => user.name)
  .toArray()
// [ 'Marcus', 'Norman', 'Christian' ]

const marcus = users.find(user => {
  return user.name === 'Marcus'
})
// { id: 1, name: 'Marcus' }
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
