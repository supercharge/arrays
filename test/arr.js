'use strict'

const { test } = require('uvu')
const expect = require('expect')
const { Arr } = require('../dist')

test('from', () => {
  expect(Arr.from().toArray()).toEqual([])
  expect(Arr.from([]).toArray()).toEqual([])
  expect(Arr.from(null).toArray()).toEqual([null])
  expect(Arr.from(undefined).toArray()).toEqual([undefined])
  expect(Arr.from([1, 1, 2, 3]).toArray()).toEqual([1, 1, 2, 3])

  expect(Arr.from(['Super']).toArray()).toEqual(['Super'])
  expect(Arr.from('Super').toArray()).toEqual(['S', 'u', 'p', 'e', 'r'])
})

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
  expect(Arr.from().all()).toEqual([])
  expect(Arr.from(null).all()).toEqual([null])
  expect(Arr.from(undefined).all()).toEqual([undefined])
  expect(Arr.from([]).all()).toEqual([])

  expect(Arr.from([0]).all()).toEqual([0])
  expect(Arr.from(1, 2, 3).all()).toEqual([1, 2, 3])
  expect(Arr.from([1, 2, 3]).all()).toEqual([1, 2, 3])
})

test('removeNullish', () => {
  expect(Arr.from().removeNullish().all()).toEqual([])
  expect(Arr.from(null).removeNullish().all()).toEqual([])
  expect(Arr.from(undefined).removeNullish().all()).toEqual([])
})

test('chunk', () => {
  const input = [1, 2, 3, 4, 5, 6, 7, 8]

  expect(
    Arr.from(input)
      .chunk(3)
  ).toEqual([[1, 2, 3], [4, 5, 6], [7, 8]])
  expect(input).toEqual([1, 2, 3, 4, 5, 6, 7, 8])

  expect(
    Arr.from([1, 2, 3, 4, 5, 6, 7, 8])
      .filter(item => item > 5)
      .chunk(2)
  ).toEqual([[6, 7], [8]])
})

test('collapse', () => {
  expect(
    Arr.from([[1], [{}, 'Marcus', true], [22]])
      .collapse()
      .all()
  ).toEqual([1, {}, 'Marcus', true, 22])
})

test('compact', () => {
  expect(
    Arr.from([0, null, undefined, 1, false, 2, '', 3, NaN])
      .compact()
      .all()
  ).toEqual([1, 2, 3])
})

test('concat', () => {
  expect(Arr.from().concat().all()).toEqual([])
  expect(Arr.from([]).concat([]).all()).toEqual([])

  expect(Arr.from().concat(1).all()).toEqual([1])
  expect(Arr.from([]).concat([1]).all()).toEqual([1])

  expect(Arr.from([1]).concat([]).all()).toEqual([1])
  expect(Arr.from(1, 2).concat().all()).toEqual([1, 2])
  expect(Arr.from(1, 2).concat([]).all()).toEqual([1, 2])

  expect(Arr.from(1, 2).concat(3, 4).all()).toEqual([1, 2, 3, 4])
  expect(Arr.from(1, 2).concat([3, 4]).all()).toEqual([1, 2, 3, 4])
  expect(Arr.from([1, 2]).concat(3, 4).all()).toEqual([1, 2, 3, 4])
  expect(Arr.from([1, 2]).concat([3, 4]).all()).toEqual([1, 2, 3, 4])
})

test('diff', () => {
  const items = [1, 2, 3]
  const arr = Arr.from([1, 2, 3])

  expect(arr.diff([2, 3, 4, 5]).all()).toEqual([1])
  expect(arr.all()).toEqual(items)

  expect(Arr.from([1, 2, 3]).diff([1, 3, 5, 7]).all()).toEqual([2])

  expect(Arr.from([1, 2, 3]).diff([1, 3, 5, 7]).all()).toEqual([2])
})

test('filter', () => {
  expect(
    Arr.from()
      .filter(value => value > 1)
      .all()
  ).toEqual([])

  expect(
    Arr.from([1, 2, 3])
      .filter(value => value > 1)
      .all()
  ).toEqual([2, 3])

  expect(
    Arr.from([1, 2, 3])
      .filter(value => value > 1)
      .concat(4, 5)
      .all()
  ).toEqual([2, 3, 4, 5])
})

test('intersect', () => {
  const items = [1, 2, 3, 3]
  const arr = Arr.from(items)
  const intersect = arr.intersect([2, 3, 4, 5])
  expect(intersect.all()).toEqual([2, 3])
  expect(arr.all()).toEqual(items)

  expect(arr.intersect([2, 5, 3]).all()).toEqual([2, 3])
})

test('isEmpty', () => {
  expect(Arr.from().isEmpty()).toBe(true)
  expect(Arr.from([]).isEmpty()).toBe(true)

  expect(Arr.from(1).isEmpty()).toBe(false)
  expect(Arr.from([1]).isEmpty()).toBe(false)
  expect(Arr.from([]).concat(1).isEmpty()).toBe(false)
})

test('isNotEmpty', () => {
  expect(Arr.from().isNotEmpty()).toBe(false)
  expect(Arr.from([]).isNotEmpty()).toBe(false)

  expect(Arr.from(1).isNotEmpty()).toBe(true)
  expect(Arr.from([1]).isNotEmpty()).toBe(true)
  expect(Arr.from([]).concat(1).isNotEmpty()).toBe(true)
})

test('join', () => {
  expect(Arr.from([1, 2, 3]).join()).toEqual('1,2,3')
  expect(Arr.from([1, 2, 3]).join('')).toEqual('123')
  expect(Arr.from([1, 2, 3]).join('-')).toEqual('1-2-3')

  expect(
    Arr.from([1, 2, 3])
      .join('-.-')
  ).toEqual('1-.-2-.-3')
})

test('max', () => {
  expect(Arr.from([10, 20, 2, 1]).max()).toEqual(20)
  expect(Arr.from([55, 5, 10]).max()).toEqual(55)

  expect(Arr.from([-10, -20]).max()).toEqual(-10)
  expect(Arr.from([-20, 15]).max()).toEqual(15)
})

test('median', () => {
  expect(Arr.from([1, 2, 3]).median()).toEqual(2)

  expect(Arr.from([1, 3, 2]).median()).toEqual(2)

  expect(Arr.from([1, 2]).median()).toEqual(1.5)

  expect(Arr.from([2, 8, 24, 4, 6, 94]).median()).toEqual(7)
})

test('min', () => {
  expect(Arr.from(10, 2, 3, 4).min()).toEqual(2)
  expect(Arr.from([10, 2, 3, 4]).min()).toEqual(2)
  expect(Arr.from([10, '2', 3, 4]).min()).toEqual(2)
  expect(Arr.from([10, 2, -1, 4]).min()).toEqual(-1)
})

test('pop', () => {
  expect(Arr.from([1, 2, 3]).pop()).toEqual(3)

  const arr = Arr.from([])
  const undef = arr.pop()
  expect(undef).toBeUndefined()
  expect(arr.all()).toEqual([])

  const pipeline = Arr.from([2, 4, 6, 8, 10]).filter(item => item > 5)
  const ten = pipeline.pop()
  expect(ten).toEqual(10)
  expect(pipeline.all()).toEqual([6, 8])
})

test('reverse', () => {
  expect(Arr.from().reverse().all()).toEqual([])
  expect(Arr.from([]).reverse().all()).toEqual([])

  expect(Arr.from([1]).reverse().all()).toEqual([1])

  expect(Arr.from([1, 2, 3]).reverse().all()).toEqual([3, 2, 1])
  expect(Arr.from([1, 2, 1]).reverse().all()).toEqual([1, 2, 1])

  const items = [1, 2, 3]
  const arr = Arr.from(items)

  expect(arr.reverse().all()).toEqual([3, 2, 1])
  expect(arr.all()).toEqual([1, 2, 3])
  expect(items).toEqual([1, 2, 3])
})

test('shift', () => {
  const arr = Arr.from([1, 2, 3])
  const one = arr.shift()
  expect(one).toEqual(1)
  expect(arr.all()).toEqual([2, 3])

  const pipeline = Arr.from([2, 4, 6, 8, 10]).filter(item => item > 5)
  const six = pipeline.shift()
  expect(six).toEqual(6)
  expect(pipeline.all()).toEqual([8, 10])
})

test('size', () => {
  expect(Arr.from().size()).toEqual(0)
  expect(Arr.from([]).size()).toEqual(0)

  expect(Arr.from(1).size()).toEqual(1)
  expect(Arr.from([1, 2, 3]).size()).toEqual(3)
})

test('slice', () => {
  const arr1 = Arr.from([1, 2, 3, 4, 5, 6])
  const chunk1 = arr1.slice(3).all()
  expect(arr1.all()).toEqual([1, 2, 3, 4, 5, 6])
  expect(chunk1).toEqual([4, 5, 6])

  const arr2 = Arr.from([1, 2, 3, 4, 5, 6])
  const chunk2 = arr2.slice(3, 2).all()
  expect(arr2.all()).toEqual([1, 2, 3, 4, 5, 6])
  expect(chunk2).toEqual([4, 5])
})

test('sort', () => {
  const arr = Arr.from([3, 2, 1])
  const sorted = arr.sort()
  expect(arr.all()).toEqual([3, 2, 1])
  expect(sorted.all()).toEqual([1, 2, 3])

  const arr1 = Arr.from([1, 2, 3])
  const sorted1 = arr1.sort((a, b) => b - a)
  expect(arr1.all()).toEqual([1, 2, 3])
  expect(sorted1.all()).toEqual([3, 2, 1])
})

test('splice', () => {
  const arr1 = Arr.from([1, 2, 3, 4, 5])
  const chunk1 = arr1.splice(2)
  expect(arr1.all()).toEqual([1, 2])
  expect(chunk1.all()).toEqual([3, 4, 5])

  // splice with start and limit
  const arr2 = Arr.from([1, 2, 3, 4, 5])
  const chunk2 = arr2.splice(2, 2)
  expect(arr2.all()).toEqual([1, 2, 5])
  expect(chunk2.all()).toEqual([3, 4])

  // inserts items
  const arr3 = Arr.from([1, 2, 3, 4, 5])
  const chunk3 = arr3.splice(2, 2, 8, 9)
  expect(arr3.all()).toEqual([1, 2, 8, 9, 5])
  expect(chunk3.all()).toEqual([3, 4])

  // inserts items from an array
  const arr4 = Arr.from([1, 2, 3, 4, 5])
  const chunk4 = arr4.splice(2, 2, [10, 11])
  expect(arr4.all()).toEqual([1, 2, 10, 11, 5])
  expect(chunk4.all()).toEqual([3, 4])

  // takes more items than available
  const arr5 = Arr.from([1, 2, 3, 4, 5])
  const chunk5 = arr5.splice(2, 10)
  expect(arr5.all()).toEqual([1, 2])
  expect(chunk5.all()).toEqual([3, 4, 5])

  // keeps order of array pipeline
  const arr6 = Arr.from([10, 20, 30, 40, 50]).filter(item => item > 10)
  const chunk6 = arr6.splice(0, 1)
  expect(arr6.all()).toEqual([30, 40, 50])
  expect(chunk6.all()).toEqual([20])
})

test('takeAndRemove', () => {
  const arr = Arr.from([1, 2, 3, 4, 5, 6])
  const firstTwo = arr.takeAndRemove(2)
  expect(firstTwo.all()).toEqual([1, 2])
  expect(arr.all()).toEqual([3, 4, 5, 6])

  const arr2 = Arr.from([1, 2, 3, 4, 5, 6])
  const lastTwo = arr2.takeAndRemove(-2)
  expect(lastTwo.all()).toEqual([5, 6])
  expect(arr2.all()).toEqual([1, 2, 3, 4])

  const pipeline = Arr.from([10, 20, 30, 40, 50, 60])
    .filter(item => item > 20)
  const all = pipeline.takeAndRemove(30)
  expect(pipeline.all()).toEqual([])
  expect(all.all()).toEqual([30, 40, 50, 60])
})

test('toJSON', () => {
  expect(
    Arr.from([11, 22, 33, 44, 55, 66]).toJSON()
  ).toEqual('[11,22,33,44,55,66]')

  expect(
    Arr.from([{ test: 'value1', test2: 2 }]).toJSON()
  ).toEqual('[{"test":"value1","test2":2}]')
})

test('unshift', () => {
  expect(
    Arr.from([1, 2, 3])
      .unshift(4, 5)
      .all()
  ).toEqual([4, 5, 1, 2, 3])

  expect(
    Arr.from([2, 4, 6])
      .filter(item => item > 5)
      .unshift(10, 20, 30)
      .all()
  ).toEqual([10, 20, 30, 6])
})

test('find', () => {
  const arr = Arr.from([
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Norman' },
    { id: 3, name: 'Christian' }
  ])

  expect(
    arr.find((value) => value.name === 'Marcus')
  ).toEqual({ id: 1, name: 'Marcus' })

  expect(
    arr.find((value) => value.name === 'Supercharge')
  ).toBeUndefined()
})

test('findIndex', () => {
  const arr = Arr.from([
    { id: 1, name: 'Marcus' },
    { id: 2, name: 'Norman' },
    { id: 3, name: 'Christian' }
  ])

  expect(
    arr.findIndex((value) => value.name === 'Norman')
  ).toEqual(1)

  expect(
    arr.findIndex((value) => value.name === 'Supercharge')
  ).toEqual(-1)
})

test('last', () => {
  expect(
    Arr.from([1, 2, 3]).last()
  ).toEqual(3)

  expect(
    Arr.from([5, 4, 3, 2, 1]).last(value => {
      return value > 3
    })
  ).toEqual(4)

  expect(
    Arr.from([5, 4, 3, 2, 1]).last(value => {
      return value > 10
    })
  ).toBeUndefined()
})

test('findLast', () => {
  const ids = Arr.from(1, 2, 3, 4)
  expect(ids.findLast(id => id < 5)).toBe(4)
  expect(ids.findLast(id => id > 3)).toBe(4)
  expect(ids.findLast(id => id > 10)).toBeUndefined()

  const christian = { id: 3, name: 'Christian', subscribed: true }
  const arr = Arr.from([
    { id: 1, name: 'Marcus', subscribed: true },
    { id: 2, name: 'Norman', subscribed: true },
    christian
  ])

  expect(arr.findLast((value) => value.subscribed)).toEqual(christian)
  expect(arr.findLast((value) => value.name === 'Supercharge')).toBeUndefined()
})

test('at', () => {
  expect(
    Arr.from([1, 2, 3]).at(0)
  ).toEqual(1)

  expect(
    Arr.from([1, 2, 3]).at(-1)
  ).toEqual(3)

  expect(
    Arr.from([1, 2, 3]).at(-2)
  ).toEqual(2)

  expect(
    Arr.from([1, 2, 3]).at(10)
  ).toBeUndefined()
})

test('toArray', () => {
  const array = Arr.from()
  array
    .push({ id: 1, name: 'Marcus' })
    .push({ id: 2, name: 'Norman' })
    .push({ id: 3, name: 'Christian' })

  expect(array.toArray).toBeInstanceOf(Function)

  const marcus = array.toArray().find(user => {
    return user.id === 1
  })

  expect(marcus).toEqual({ id: 1, name: 'Marcus' })
})

test('map', () => {
  expect(Arr.from().map(x => x * 2).all()).toEqual([])
  expect(Arr.from([]).map(x => x * 2).all()).toEqual([])
  expect(Arr.from([1, 2, 3]).map(x => x * 2).all()).toEqual([2, 4, 6])

  const arr = new Arr()
  arr
    .push({ id: 1, name: 'Marcus' })
    .push({ id: 2, name: 'Norman' })
    .push({ id: 3, name: 'Christian' })

  const users = arr.map((value) => {
    return value.name
  })

  expect(users.has('Marcus')).toBe(true)
  expect(users.toArray()).toEqual(['Marcus', 'Norman', 'Christian'])
})

test('flatMap', () => {
  expect(Arr.from().flatMap(x => x).all()).toEqual([])
  expect(Arr.from([[]]).flatMap(x => x).all()).toEqual([])
  expect(Arr.from([[1], [2], [3]]).flatMap(x => x).all()).toEqual([1, 2, 3])

  const arr = new Arr()
  arr
    .push({ id: 1, name: 'Marcus', tags: ['node', ['pm2']] })
    .push({ id: 2, name: 'Norman', tags: ['python'] })
    .push({ id: 3, name: 'Christian', tags: ['javascript', 'python'] })

  const tags = arr.flatMap((value) => {
    return value.tags
  })

  expect(tags.toArray()).toEqual(['node', ['pm2'], 'python', 'javascript', 'python'])
})

test('has', () => {
  expect(Arr.from(null).has(null)).toBe(true)
  expect(Arr.from().has(undefined)).toBe(false)
  expect(Arr.from(null).has(item => item === null)).toBe(true)

  const arr = Arr.from([1, 2])

  expect(arr.has(1)).toBe(true)
  expect(arr.has(2)).toBe(true)

  expect(arr.has(3)).toBe(false)
  expect(arr.has(undefined)).toBe(false)
  expect(arr.has(num => num < 2)).toBe(true)
})

test('isMissing', () => {
  const arr = Arr.from([1, 2])
  expect(Arr.from(null).isMissing(null)).toBe(false)
  expect(Arr.from().isMissing(undefined)).toBe(true)

  expect(arr.isMissing(3)).toBe(true)
  expect(arr.isMissing(null)).toBe(true)
  expect(arr.isMissing(undefined)).toBe(true)

  expect(arr.isMissing(1)).toBe(false)
  expect(arr.isMissing(2)).toBe(false)
})

test('reduce', () => {
  expect(
    Arr.from([1, 2, 3]).reduce((carry, item) => {
      return carry + item
    }, 0)
  ).toEqual(6)

  expect(
    Arr.from(['one', 'two', 'three'])
      .map(item => item)
      .reduce((carry, item) => {
        return `${carry}---${item}`
      }, 'hey')
  ).toEqual('hey---one---two---three')
})

test('groupBy', () => {
  const products = [
    { name: 'Macbook', price: 2500 },
    { name: 'Macbook', price: 3000 },
    { name: 'iPhone', price: 1000 }
  ]

  expect(() => {
    Arr.from(products).groupBy('name.price')
  }).toThrow()

  expect(
    Arr.from(products).groupBy('nonExistentKey')
  ).toEqual({ '': products })

  expect(
    Arr.from(products).groupBy('name')
  ).toEqual({
    Macbook: [
      { name: 'Macbook', price: 2500 },
      { name: 'Macbook', price: 3000 }
    ],
    iPhone: [
      { name: 'iPhone', price: 1000 }
    ]
  })
})

test.run()
