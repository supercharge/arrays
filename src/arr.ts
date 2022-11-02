'use strict'

type Values<T> = Array<T | Iterable<T> | undefined | null>

type Predicate<T> = ((item: T, index: number, array: Arr<T>) => unknown)

export class Arr<T> {
  /**
   * The values to work with.
   */
  private readonly values: T[]

  /**
   * Create a new array instance providing chainable operations. This instance
   * shallow clones the original values and works with the clone.
   *
   * @param {T[]} values
   *
   * @returns {Arr}
   */
  constructor (...values: Values<T>) {
    this.values = []

    this.push(...values)
  }

  /**
   * Creates an array from an iterable object.
   *
   * @param values  An iterable object to convert to an array.
   */
  static from<T> (...values: Values<T>): Arr<T> {
    return new this<T>(...values)
  }

  /**
   * Determine whether the given `input` is an array.
   *
   * @param value - the `input` value to check whether it’s an array
   */
  static isIterable (value?: any): value is Iterable<any> {
    return Array.from(value).length > 0
  }

  /**
   * Determine whether the given `input` is an array.
   *
   * @param input - the `input` value to check whether it’s an array
   */
  static isArray (input?: any): input is any[] {
    return Array.isArray(input)
  }

  /**
   * Determine whether the given `input` is not an array.
   *
   * @param input - the `input` value to check whether it’s not an array
   */
  static isNotArray<T> (input?: any[] | T): input is T {
    return !this.isArray(input)
  }

  /**
   * Returns the underlying, plain JavaScript array.
   *
   * @returns {T[]}
   */
  all (): T[] {
    return this.values
  }

  /**
   * Append the given `values` to the end of the array. This is an alias for `push`.
   *
   * @returns {this}
   */
  append (...values: Values<T>): this {
    return this.push(...values)
  }

  /**
   * Returns the value at the given `index` or undefined if the index exceeds the array’s size.
   *
   * @param {Number} index
   *
   * @returns {T | undefined}
   */
  at (index: number): T | undefined {
    index = Math.trunc(index) || 0

    if (index < 0) {
      index += this.size()
    }

    if (index < 0 || index >= this.size()) {
      return undefined
    }

    return this.all()[index]
  }

  /**
   * Collapse a array of arrays into a single, flat array.
   *
   * @returns {Array}
   */
  collapse (): Arr<T> {
    return new Arr(...this.values)
  }

  /**
   * Removes all falsy values from the given `array`. Falsy values
   * are `null`, `undefined`, `''`, `false`, `0`, `-0`, `0n`, `NaN`.
   *
   * @returns {Arr}
   */
  compact (): Arr<T> {
    return this.filter(Boolean)
  }

  /**
   * Returns an array containing the concatenation of two or more values.
   *
   * @param {T[] | T[][]} values
   *
   * @returns {Arr}
   */
  concat (...values: Array<T | T[]>): Arr<T> {
    return new Arr(
      ...this.values.concat(...values)
    )
  }

  /**
   * Breaks the array into multiple, smaller arrays
   * of the given `size`.
   *
   * @param {Number} size
   *
   * @returns {Array}
   */
  chunk (size: number): T[][] {
    const chunks = []

    while (this.size()) {
      chunks.push(
        this.values.splice(0, size)
      )
    }

    return chunks
  }

  /**
   * Removes all values from the array that are present in the given array.
   *
   * @param {*} values
   *
   * @returns {Arr}
   */
  diff (values: T[]): Arr<T> {
    return this.filter((value: T) => {
      return !values.includes(value)
    })
  }

  /**
   *
   *
   * @param {Function} predicate
   *
   * @returns {Arr}
   */
  filter (predicate: (value: T, index: number, array: Arr<T>) => unknown): Arr<T>
  filter<S extends T>(predicate: (value: T, index: number, array: Arr<T>) => value is S, thisArg?: any): Arr<S>
  filter (predicate: (value: T, index: number, array: Arr<T>) => unknown): Arr<T> {
    const arr = new Arr<T>()

    this.values.forEach((value: T, index: number) => {
      if (predicate(value, index, this)) {
        arr.push(value)
      }
    })

    return arr
  }

  /**
   * Returns the first item in the array matching the given `predicate`
   * function, or `undefined` if no such item was found.
   *
   * @param {Function} predicate
   *
   * @returns {T | undefined}
   */
  find (predicate: (item: T, index: number, array: Arr<T>) => unknown): T | undefined
  find<S extends T> (predicate: (item: T, index: number, array: Arr<T>) => item is S): S | undefined
  find (predicate: (item: T, index: number, array: Arr<T>) => unknown): T | undefined {
    return this.all().find((value, index) => {
      return predicate(value, index, this)
    })
  }

  /**
   * Returns the index of the first element in the array where the
   * given `predicate` function is `true`. Returns -1 otherwise.
   *
   * @param {Function} predicate
   *
   * @returns {Number}
   */
  findIndex (predicate: (item: T, index: number, array: Arr<T>) => unknown): number
  findIndex<S extends T> (predicate: (item: T, index: number, array: Arr<T>) => item is S): number
  findIndex (predicate: (item: T, index: number, array: Arr<T>) => unknown): number {
    return this.all().findIndex((value, index) => {
      return predicate(value, index, this)
    })
  }

  /**
   * Returns the last item in the array matching the given `predicate`
   * function. Returns `undefined` if no item was found in the array.
   *
   * @param {Function} predicate
   *
   * @returns {T | undefined}
   */
  findLast<S extends T> (predicate: (item: T, index: number, array: Arr<T>) => item is S): S | undefined
  findLast (predicate: (item: T, index: number, array: Arr<T>) => unknown): T | undefined
  findLast (predicate: (item: T, index: number, array: Arr<T>) => unknown): T | undefined {
    return this.reverse().find((item, index) => {
      return predicate(item, index, this)
    })
  }

  /**
   * Returns a new array instance containing the results of applying the
   * given `transform` function to each item in the array. Ultimately,
   * it flattens the mapped results one level deep.
   *
   * @param {Function} transform
   *
   * @returns {Array}
   */
  flatMap<R> (transform: (item: T, index: number, arr: Arr<T>) => R): Arr<R> {
    return this.map<R>((item, index) => {
      return transform(item, index, this)
    }).collapse()
  }

  /**
   * Performs the given `action` for each item in the array.
   *
   * @param {Function} action
   */
  forEach (action: (item: T, index: number, arr: Arr<T>) => void): void {
    this.map(action)
  }

  /**
   * Group the array items into arrays using the given `key`.
   *
   * @param {String} key
   *
   * @returns {Object}
   */
  groupBy<R = any> (key: keyof T | ((item: T) => any)): R {
    if (typeof key === 'string' && key.includes('.')) {
      throw new Error('We do not support nested grouping yet. Please send a PR for that feature.')
    }

    const selector = this.valueRetriever(key)

    return this.reduce((carry: any, item: T) => {
      const group = selector(item) || ''

      if (carry[group] === undefined) {
        carry[group] = []
      }

      carry[group].push(item)

      return carry
    }, {})
  }

  /**
   * Create a value receiving callback.
   *
   * @param {*} value
   *
   * @returns {Function}
   */
  private valueRetriever (value: keyof T | ((item: T) => any)): (item: any) => any {
    return typeof value === 'function'
      ? value
      : function (item: T) {
        return item[value]
      }
  }

  /**
   * Determine whether the array contains the given `value`.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  has (valueOrPredicate: T | Predicate<T>): boolean {
    const results = typeof valueOrPredicate === 'function'
      ? this.filter((item, index) => (valueOrPredicate as Predicate<T>)(item, index, this))
      : this.filter(item => item === valueOrPredicate)

    return results.length() > 0
  }

  /**
   * Creates an array of unique values that are included in both given array.
   *
   * @param {Array} values
   *
   * @returns {Arr}
   */
  intersect (values: T[]): Arr<T> {
    return new Arr(...new Set(
      this.values.filter((value: T) => values.includes(value))
    ))
  }

  /**
   * Determine whether the array is empty.
   *
   * @returns {Boolean}
   */
  isEmpty (): boolean {
    return this.length() === 0
  }

  /**
   * Determine whether the array does not contain the given `value`.
   *
   * @param {*} value
   *
   * @returns {Boolean}
   */
  isMissing (value: T): boolean {
    return !this.has(value)
  }

  /**
   * Determine whether the array is not empty.
   *
   * @returns {Boolean}
   */
  isNotEmpty (): boolean {
    return !this.isEmpty()
  }

  /**
   * Returns a new string by concatenating all of the elements in an array.
   *
   * @param {String} separator
   *
   * @returns {String}
   */
  join (separator: string): string {
    return this.values.join(separator)
  }

  /**
   * Returns the last element of the array or returns the last item in the array matching
   * the given `predicate` function. Returns `undefined` if no matching item is found or
   * available. If no predicate is given then the last item in the array is returned.
   *
   * @param {Function} predicate
   *
   * @returns {T | undefined}
   */
  last (predicate?: (item: T, index: number, array: Arr<T>) => unknown): T | undefined {
    return predicate
      ? this.findLast(predicate)
      : this.at(-1)
  }

  /**
   * Returns the number of items in the array.
   *
   * @returns {Number}
   */
  length (): number {
    return this.values.length
  }

  /**
   * Returns a new array instance containing the results after applying
   * the given `transform` function to each item in the array.
   *
   * @param {Function} transform
   *
   * @returns {Arr<R>}
   */
  map<R> (transform: (item: T, index: number, arr: Arr<T>) => R): Arr<R> {
    return Arr.from(
      this.toArray().map((value, index) => {
        return transform(value, index, this)
      })
    )
  }

  /**
   * Returns the max value in the array.
   *
   * @returns {Number}
   */
  max (): number {
    return Math.max(
      ...this.values.map(value => +value)
    )
  }

  /**
   * Returns median of the current array.
   *
   * @param {}
   *
   * @returns {Number}
   */
  median (): number {
    const sorted: Arr<T> = this.sort((a: T, b: T) => +a - +b)

    const mid: number = Math.floor(this.size() / 2)

    return this.size() % 2 !== 0
      ? +sorted.all()[mid]
      : (+sorted.all()[mid] + +sorted.all()[(mid - 1)]) / 2 // eslint-disable-line
  }

  /**
   * Returns the min value in the array.
   *
   * @returns {Number}
   */
  min (): number {
    return Math.min(...this.values.map((value: T) => +value))
  }

  /**
   * Removes and returns the last item from the array.
   *
   * @returns {T|undefined}
   */
  pop (): T | undefined {
    return this.values.pop()
  }

  /**
   * Prepend the given `values` to the beginning of the array. This is an alias for `unshift`.
   *
   * @returns {this}
   */
  prepend (...values: T[]): this {
    return this.unshift(...values)
  }

  /**
   * Add one or more items to the end of the array.
   *
   * @returns {Arr}
   */
  push (...values: Values<T>): this {
    this.values.push(...this.resolveValues(...values))

    return this
  }

  /**
   * Returns a flat array of items removing `undefined` and `null` values.
   *
   * @param values
   *
   * @returns {T[]}
   */
  private resolveValues (...values: Values<T>): T[] {
    return values.flatMap(value => {
      if (value == null) {
        return value
      }

      if (Array.isArray(value)) {
        return value
      }

      if (typeof value === 'string') {
        return value
      }

      if (Arr.isIterable(value)) {
        return Array.from(value)
      }

      return ([] as Values<T>).concat(value)
    }) as T[]
  }

  /**
   * Returns a new array instance containing the results after applying
   * the given `transform` function to each item in the array.
   *
   * @param {Function} transform
   *
   * @returns {Arr<R>}
   */
  reduce<R> (reducer: (previousValue: R, currentValue: T, currentIndex: number, array: Arr<T>) => R, initialValue: R): R
  reduce<R> (reducer: (previousValue: R, currentValue: T, currentIndex: number, array: Arr<T>) => R, initialValue: R): R {
    return this.toArray().reduce((carry, current, index) => {
      return reducer(carry, current, index, this)
    }, initialValue)
  }

  /**
   * Removes `undefined` and `null` values from the array.
   *
   * @returns {Arr}
   */
  removeNullish (): Arr<T> {
    return this.filter(item => {
      return item != null
    })
  }

  /**
  * Returns reversed version of original array.
  *
  * @returns {Arr}
  */
  reverse (): Arr<T> {
    return new Arr<T>(
      [...this.values].reverse()
    )
  }

  /**
   * Removes and returns the first item from the array.
   *
   * @returns {(T|undefined)}
   */
  shift (): T | undefined {
    return this.values.shift()
  }

  /**
   * Returns the number of items in the array. This method is an alias for `.length()`.
   *
   * @returns {Number}
   */
  size (): number {
    return this.length()
  }

  /**
   * Returns a chunk of items beginning at the `start`
   * index without removing them from the array.
   * You can `limit` the size of the slice.
   *
   * @param {Number} start
   * @param {Number} limit
   *
   * @returns {Arr}
   */
  slice (start: number, limit?: number): Arr<T> {
    const chunk: T[] = this.values.slice(start)

    return new Arr(...chunk.slice(0, limit))
  }

  /**
  * Removes and returns a chunk of items beginning at the `start`
  * index from the array. You can `limit` the size of the
  * slice and replace the removed items with `inserts`.
  *
  * @param {Number} start
  * @param {Number} limit
  * @param {Array} inserts
  *
  * @returns {Arr}
  */
  splice (start: number, limit?: number, ...inserts: T[]): Arr<T> {
    const flattend: T[] = Array.prototype.concat(...inserts)
    const result: T[] = this.values.splice(start, limit ?? this.values.length, ...flattend)

    return new Arr(...result)
  }

  /**
   * Returns a sorted array of items, with an optional comparator.
   *
   * @param {Function} comparator
   *
   * @returns {Arr}
   */
  sort (comparator: (a: T, b: T) => number): Arr<T> {
    return new Arr(
      ...this.values.slice(0).sort(comparator)
    )
  }

  /**
   * Take and remove `limit` items from the
   * beginning or end of the array.
   *
   * @param {Integer} limit
   *
   * @returns {Arr}
   */
  takeAndRemove (limit: number): Arr<T> {
    const cloned = new Arr(...this.values)

    if (limit < 0) {
      this.values.splice(limit)
    } else {
      this.values.splice(0, limit)
    }

    return limit < 0
      ? cloned.slice(limit)
      : cloned.slice(0, limit)
  }

  /**
   * Transforms this array into a native JavaScript array.
   *
   * @returns {T[]}
   */
  toArray (): T[] {
    return this.all()
  }

  /**
   * Returns JSON representation of array.
   *
   * @returns {String}
   */
  toJSON (): string {
    return JSON.stringify(this.values)
  }

  /**
   * Add one or more items to the beginning of the array.
   *
   * @param {Array} values
   *
   * @returns {Arr}
   */
  unshift (...values: T[]): this {
    this.values.unshift(...values)

    return this
  }
}
