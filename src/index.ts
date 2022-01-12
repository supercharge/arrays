'use strict'

import { Arr as Arrays } from './arr'
import { ArrContract } from './arr-contract'

/**
 * Creates a new  providing chainable string operations. This new
 * instance clones the original string and works with the clone.
 * It won’t modify the original string value.
 *
 * @param {*} values
 */
const arr: ArrContract = function <T>(...values: T[] | T[][]): Arrays<T> {
  return new Arrays<T>(...values).removeNullish()
}

/**
 * Creates an array from an iterable object.
 *
 * @param iterable  An iterable object to convert to an array.
 */
function from <T> (iterable: Iterable<T> | ArrayLike<T>): Arrays<T>
function from <T, U> (iterable: Iterable<T> | ArrayLike<T>, mapfn: (value: T, index: number) => U, thisArg?: any): Arrays<U>
function from <T, U> (iterable: Iterable<T> | ArrayLike<T>, mapfn?: (value: T, index: number) => U, thisArg?: any): Arrays<T | U> {
  iterable = iterable ?? []
  const values = mapfn ? Array.from(iterable, mapfn, thisArg) : Array.from(iterable)

  return new Arrays<T | U>(values)
}

/**
 * Determine whether the given `input` is an array.
 *
 * @param input - the `input` value to check whether it’s an array
 */
function isArray (input?: any): boolean {
  return Array.isArray(input)
}

/**
 * Determine whether the given `input` is not an array.
 *
 * @param input - the `input` value to check whether it’s not an array
 */
function isNotArray (input?: any): boolean {
  return !arr.isArray(input)
}

arr.from = from
arr.isArray = isArray
arr.isNotArray = isNotArray

export default arr
export const Arr = arr
