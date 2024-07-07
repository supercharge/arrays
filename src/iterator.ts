'use strict'

export class ArrIterator<T> implements IterableIterator<T> {
  /**
   * Stores the array items.
   */
  private readonly values: T[]

  /**
   * The next value’s index.
   */
  private pointer: number = 0

  /**
   * Create a new iterator for the given `values`.
   */
  constructor (values: T[]) {
    this.values = values
  }

  /**
   * Returns itself to allow re-using this iterator when exiting a loop early (via break, return, etc.).
   */
  [Symbol.iterator] (): IterableIterator<T> {
    return this
  }

  /**
   * Returns the next iteration result following the JS iteration protocol. The
   * iteration object contains the next item if there’s one available and a
   * boolean `done` attribute telling JS whether all items are iterated.
   */
  next (): IteratorResult<T> {
    return this.pointer < this.values.length
      ? { done: false, value: this.values[this.pointer++] }
      : { done: true, value: undefined }
  }
}
