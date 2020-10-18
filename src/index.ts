'use strict'

import { Arr } from './arr'
import { ArrContract } from './arr-contract'

/**
 * Creates a new  providing chainable string operations. This new
 * instance clones the original string and works with the clone.
 * It won’t modify the original string value.
 *
 * @param value - `value` is the value being wrapped into an `Str` instance
 */
const array: ArrContract = function <T>(...values: T[]): Arr<T> {
  return new Arr<T>(...values)
}

/**
 * Determine whether the given `input` is a string.
 *
 * @param input - the `input` value to check whether it’s a string
 */
array.isArray = (input?: any): boolean => {
  return Array.isArray(input)
}

export = array
