'use strict'

export class Arr<T> {
  /**
   * The values to work with.
   */
  private readonly values: T[]

  /**
   * Create a new array instance providing chainable operations. This instance
   * shallow clones the original values and works with the clone. While creating
   * the instance, both `undefined` and `null` values will be removed.
   *
   * @param {T[]} values
   *
   * @returns {Arr}
   */
  constructor (...values: T[]) {
    this.values = ([] as T[])
      .concat(...values)
      .filter(value => value !== null)
      .filter(value => value !== undefined)
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
   * Removes all falsy values from the given `array`. Falsy values
   * are `null`, `undefined`, `''`, `false`, `0`, `-0`, `0n`, `NaN`.
   *
   * @returns {SyncCollection}
   */
  compact (): Arr<T> {
    return this.filter(Boolean)
  }

  /**
   * Returns an array containing the concatenation of two or more values.
   *
   * @param {T|T[]} values
   *
   * @returns {Arr}
   */
  concat (...values: T[]): Arr<T> {
    return new Arr<T>(
      ...this.values, ...values
    )
  }

  /**
   *
   *
   * @param {Function} predicate
   *
   * @returns {Array}
   */
  filter (predicate: (value: T, index: number, array: Arr<T>) => unknown): Arr<T>
  filter<S extends T>(predicate: (value: T, index: number, array: Arr<T>) => value is S, thisArg?: any): Arr<S>
  filter (predicate: (value: T, index: number, array: Arr<T>) => unknown): Arr<T> {
    const arr = new Arr<T>()

    this.values.forEach((value, index) => {
      if (predicate(value, index, this)) {
        arr.push(value)
      }
    })

    return arr
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
   * Returns the number of items in the array.
   *
   * @returns {Number}
   */
  length (): number {
    return this.values.length
  }

  /**
   * Returns the number of items in the array.
   *
   * @returns {Arr}
   */
  push (...values: T[]): Arr<T> {
    this.values.push(...values)

    return this
  }

  /**
   * Returns the number of items in the array. This method is an alias for `.length()`.
   *
   * @returns {Number}
   */
  size (): number {
    return this.length()
  }
}
