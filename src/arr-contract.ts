'use strict'

import { Arr } from './arr'

export interface ArrContract {
  /**
   * Create a new array instance providing chainable operations. This instance shallow
   * clones the original values and works with the clone. While creating the
   * instance, both `undefined` and `null` values will be removed.
   *
   * @param {T[]} values
   */
  <T>(...values: T[][]): Arr<T>
  <T>(...values: T[]): Arr<T>

  /**
   * Determine whether the given `input` is an array.
   *
   * @param {*} input
   */
  isArray (input?: any): boolean

  /**
   * Determine whether the given `input` is not an array.
   *
   * @param {*} input
   */
  isNotArray (input?: any): boolean
}
