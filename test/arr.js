'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { Arr } = require('../dist')

test('isArray', () => {
  expect(Arr.isArray()).toBe(false)
  expect(Arr.isArray('[]')).toBe(false)
  expect(Arr.isArray(null)).toBe(false)
  expect(Arr.isArray(undefined)).toBe(false)
  expect(Arr.isArray(1, 2, 3, 4)).toBe(false)
  expect(Arr.isArray(...[1, 2, 3])).toBe(false)

  expect(Arr.isArray([])).toBe(true)
  expect(Arr.isArray([1, 2, 3])).toBe(true)
})

test('isNotArray', () => {
  expect(Arr.isNotArray()).toBe(true)
  expect(Arr.isNotArray('[]')).toBe(true)
  expect(Arr.isNotArray(null)).toBe(true)
  expect(Arr.isNotArray(undefined)).toBe(true)
  expect(Arr.isNotArray(1, 2, 3, 4)).toBe(true)
  expect(Arr.isNotArray(...[1, 2, 3])).toBe(true)

  expect(Arr.isNotArray([])).toBe(false)
  expect(Arr.isNotArray([1, 2, 3])).toBe(false)
})

test('all', () => {
  expect(Arr().all()).toEqual([])
  expect(Arr(null).all()).toEqual([])
  expect(Arr(undefined).all()).toEqual([])
  expect(Arr([]).all()).toEqual([])

  expect(Arr([0]).all()).toEqual([0])
  expect(Arr(1, 2, 3).all()).toEqual([1, 2, 3])
  expect(Arr([1, 2, 3]).all()).toEqual([1, 2, 3])
})

test('chunk', () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8]

  expect(
    Arr(input)
      .chunk(3)
  ).toEqual([[1, 2, 3], [4, 5, 6], [7, 8]])
  expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8])

  expect(
    Arr([1, 2, 3, 4, 5, 6, 7, 8])
      .filter(item => item > 5)
      .chunk(2)
  ).toEqual([[6, 7], [8]])
})

test('collapse', () => {
  expect(
    Arr([[1], [{}, 'Marcus', true], [22]])
      .collapse()
      .all()
  ).toEqual([1, {}, 'Marcus', true, 22])
})

test('compact', () => {
  expect(
    Arr([0, null, undefined, 1, false, 2, '', 3, NaN])
      .compact()
      .all()
  ).toEqual([1, 2, 3])
})

test('concat', () => {
  expect(Arr().concat().all()).toEqual([])
  expect(Arr([]).concat([]).all()).toEqual([])

  expect(Arr().concat(1).all()).toEqual([1])
  expect(Arr([]).concat([1]).all()).toEqual([1])

  expect(Arr([1]).concat([]).all()).toEqual([1])
  expect(Arr(1, 2).concat().all()).toEqual([1, 2])
  expect(Arr(1, 2).concat([]).all()).toEqual([1, 2])

  expect(Arr(1, 2).concat(3, 4).all()).toEqual([1, 2, 3, 4])
  expect(Arr(1, 2).concat([3, 4]).all()).toEqual([1, 2, 3, 4])
  expect(Arr([1, 2]).concat(3, 4).all()).toEqual([1, 2, 3, 4])
  expect(Arr([1, 2]).concat([3, 4]).all()).toEqual([1, 2, 3, 4])
})

test('diff', () => {
  const items = [1, 2, 3]
  const arr = Arr([1, 2, 3])

  expect(arr.diff([2, 3, 4, 5]).all()).toEqual([1])
  expect(arr.all()).toEqual(items)

  expect(Arr([1, 2, 3]).diff([1, 3, 5, 7]).all()).toEqual([2])

  expect(Arr([1, 2, 3]).diff([1, 3, 5, 7]).all()).toEqual([2])
})

test('filter', () => {
  expect(
    Arr()
      .filter(value => value > 1)
      .all()
  ).toEqual([])

  expect(
    Arr([1, 2, 3])
      .filter(value => value > 1)
      .all()
  ).toEqual([2, 3])

  expect(
    Arr([1, 2, 3])
      .filter(value => value > 1)
      .concat(4, 5)
      .all()
  ).toEqual([2, 3, 4, 5])
})

test('intersect', () => {
  const items = [1, 2, 3, 3]
  const arr = Arr(items)
  const intersect = arr.intersect([2, 3, 4, 5])
  expect(intersect.all()).toEqual([2, 3])
  expect(arr.all()).toEqual(items)

  expect(arr.intersect([2, 5, 3]).all()).toEqual([2, 3])
})

test('isEmpty', () => {
  expect(Arr().isEmpty()).toBe(true)
  expect(Arr([]).isEmpty()).toBe(true)

  expect(Arr(1).isEmpty()).toBe(false)
  expect(Arr([1]).isEmpty()).toBe(false)
  expect(Arr([]).concat(1).isEmpty()).toBe(false)
})

test('isNotEmpty', () => {
  expect(Arr().isNotEmpty()).toBe(false)
  expect(Arr([]).isNotEmpty()).toBe(false)

  expect(Arr(1).isNotEmpty()).toBe(true)
  expect(Arr([1]).isNotEmpty()).toBe(true)
  expect(Arr([]).concat(1).isNotEmpty()).toBe(true)
})

test('join', () => {
  expect(Arr([1, 2, 3]).join()).toEqual('1,2,3')
  expect(Arr([1, 2, 3]).join('')).toEqual('123')
  expect(Arr([1, 2, 3]).join('-')).toEqual('1-2-3')

  expect(
    Arr([1, 2, 3])
      .join('-.-')
  ).toEqual('1-.-2-.-3')
})

test('max', () => {
  expect(Arr([10, 20, 2, 1]).max()).toEqual(20)

  expect(Arr([55, 5, 10]).max()).toEqual(55)

  expect(Arr([1, 2, 3]).max()).toEqual(3)
})

test('median', () => {
  expect(Arr([1, 2, 3]).median()).toEqual(2)

  expect(Arr([1, 3, 2]).median()).toEqual(2)

  expect(Arr([1, 2]).median()).toEqual(1.5)

  expect(Arr([2, 8, 24, 4, 6, 94]).median()).toEqual(7)
})

test('min', () => {
  expect(Arr(10, 2, 3, 4).min()).toEqual(2)
  expect(Arr([10, 2, 3, 4]).min()).toEqual(2)
  expect(Arr([10, '2', 3, 4]).min()).toEqual(2)
  expect(Arr([10, 2, -1, 4]).min()).toEqual(-1)
})

test('pop', () => {
  expect(Arr([1, 2, 3]).pop()).toEqual(3)

  const arr = Arr([])
  const undef = arr.pop()
  expect(undef).toEqual(undefined)
  expect(arr.all()).toEqual([])

  const pipeline = Arr([2, 4, 6, 8, 10]).filter(item => item > 5)
  const ten = pipeline.pop()
  expect(ten).toEqual(10)
  expect(pipeline.all()).toEqual([6, 8])
})

test('reverse', () => {
  expect(
    Arr([1, 2, 3]).reverse().all()
  ).toEqual([3, 2, 1])

  expect(
    Arr([1]).reverse().all()
  ).toEqual([1])

  expect(
    Arr([]).reverse().all()
  ).toEqual([])

  expect(
    Arr([1, 2, 3, 2, 1]).reverse().all()
  ).toEqual([1, 2, 3, 2, 1])

  const items = [1, 2, 3]
  const arr = Arr(items)

  expect(
    arr.reverse().all()
  ).toEqual([3, 2, 1])
  expect(
    arr.all()
  ).toEqual([3, 2, 1])
})

test('shift', () => {
  const arr = Arr([1, 2, 3])
  const one = arr.shift()
  expect(one).toEqual(1)
  expect(arr.all()).toEqual([2, 3])

  const pipeline = Arr([2, 4, 6, 8, 10]).filter(item => item > 5)
  const six = pipeline.shift()
  expect(six).toEqual(6)
  expect(pipeline.all()).toEqual([8, 10])
})

test('size', () => {
  expect(Arr().size()).toEqual(0)
  expect(Arr([]).size()).toEqual(0)

  expect(Arr(1).size()).toEqual(1)
  expect(Arr([1, 2, 3]).size()).toEqual(3)
})

test('slice', () => {
  const arr1 = Arr([1, 2, 3, 4, 5, 6])
  const chunk1 = arr1.slice(3).all()
  expect(arr1.all()).toEqual([1, 2, 3, 4, 5, 6])
  expect(chunk1).toEqual([4, 5, 6])

  const arr2 = Arr([1, 2, 3, 4, 5, 6])
  const chunk2 = arr2.slice(3, 2).all()
  expect(arr2.all()).toEqual([1, 2, 3, 4, 5, 6])
  expect(chunk2).toEqual([4, 5])
})

test('sort', () => {
  const arr = Arr([3, 2, 1])
  const sorted = arr.sort()
  expect(arr.all()).toEqual([3, 2, 1])
  expect(sorted.all()).toEqual([1, 2, 3])

  const arr1 = Arr([1, 2, 3])
  const sorted1 = arr1.sort((a, b) => b - a)
  expect(arr1.all()).toEqual([1, 2, 3])
  expect(sorted1.all()).toEqual([3, 2, 1])
})

test('splice', () => {
  const arr1 = Arr([1, 2, 3, 4, 5])
  const chunk1 = arr1.splice(2)
  expect(arr1.all()).toEqual([1, 2])
  expect(chunk1.all()).toEqual([3, 4, 5])

  // splice with start and limit
  const arr2 = Arr([1, 2, 3, 4, 5])
  const chunk2 = arr2.splice(2, 2)
  expect(arr2.all()).toEqual([1, 2, 5])
  expect(chunk2.all()).toEqual([3, 4])

  // inserts items
  const arr3 = Arr([1, 2, 3, 4, 5])
  const chunk3 = arr3.splice(2, 2, 8, 9)
  expect(arr3.all()).toEqual([1, 2, 8, 9, 5])
  expect(chunk3.all()).toEqual([3, 4])

  // inserts items from an array
  const arr4 = Arr([1, 2, 3, 4, 5])
  const chunk4 = arr4.splice(2, 2, [10, 11])
  expect(arr4.all()).toEqual([1, 2, 10, 11, 5])
  expect(chunk4.all()).toEqual([3, 4])

  // takes more items than available
  const arr5 = Arr([1, 2, 3, 4, 5])
  const chunk5 = arr5.splice(2, 10)
  expect(arr5.all()).toEqual([1, 2])
  expect(chunk5.all()).toEqual([3, 4, 5])

  // keeps order of array pipeline
  const arr6 = Arr([10, 20, 30, 40, 50]).filter(item => item > 10)
  const chunk6 = arr6.splice(0, 1)
  expect(arr6.all()).toEqual([30, 40, 50])
  expect(chunk6.all()).toEqual([20])
})

test('takeAndRemove', () => {
  const arr = Arr([1, 2, 3, 4, 5, 6])
  const firstTwo = arr.takeAndRemove(2)
  expect(firstTwo.all()).toEqual([1, 2])
  expect(arr.all()).toEqual([3, 4, 5, 6])

  const arr2 = Arr([1, 2, 3, 4, 5, 6])
  const lastTwo = arr2.takeAndRemove(-2)
  expect(lastTwo.all()).toEqual([5, 6])
  expect(arr2.all()).toEqual([1, 2, 3, 4])

  const pipeline = Arr([10, 20, 30, 40, 50, 60])
    .filter(item => item > 20)
  const all = pipeline.takeAndRemove(30)
  expect(pipeline.all()).toEqual([])
  expect(all.all()).toEqual([30, 40, 50, 60])
})

test('toJSON', () => {
  expect(
    Arr([11, 22, 33, 44, 55, 66]).toJSON()
  ).toEqual('[11,22,33,44,55,66]')

  expect(
    Arr([{ test: 'value1', test2: 2 }]).toJSON()
  ).toEqual('[{"test":"value1","test2":2}]')
})

test('unshift', () => {
  expect(
    Arr([1, 2, 3])
      .unshift(4, 5)
      .all()
  ).toEqual([4, 5, 1, 2, 3])

  expect(
    Arr([2, 4, 6])
      .filter(item => item > 5)
      .unshift(10, 20, 30)
      .all()
  ).toEqual([10, 20, 30, 6])
})

test.run()
