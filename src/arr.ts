'use strict'

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
  constructor (...values: T[] | T[][]) {
    this.values = ([] as T[]).concat(...values)
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
  concat (...values: T[][]): Arr<T>
  concat (...values: T[]): Arr<T>
  concat (...values: T[] | T[][]): Arr<T> {
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
    return this.filter((value: T) => !values.includes(value))
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
   * Add one or more items to the end of the array.
   *
   * @returns {Arr}
   */
  push (...values: T[]): Arr<T> {
    this.values.push(...values)

    return this
  }

  /**
   * Removes `undefined` and `null` values from the `array`.
   *
   * @returns {Arr}
   */
  removeNullish (): Arr<T> {
    return this
      .filter((item: T) => item !== null)
      .filter((item: T) => item !== undefined)
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
