'use strict'

const Arr = require('../dist')

describe('Arrays', () => {
  it('isArray', () => {
    expect(Arr.isArray()).toBe(false)
    expect(Arr.isArray('[]')).toBe(false)
    expect(Arr.isArray(null)).toBe(false)
    expect(Arr.isArray(undefined)).toBe(false)
    expect(Arr.isArray(1, 2, 3, 4)).toBe(false)

    expect(Arr.isArray([])).toBe(true)
    expect(Arr.isArray([1, 2, 3])).toBe(true)
  })

  it('all', () => {
    expect(Arr().all()).toEqual([])
    expect(Arr(null).all()).toEqual([])
    expect(Arr(undefined).all()).toEqual([])
    expect(Arr([]).all()).toEqual([])

    expect(Arr([0]).all()).toEqual([0])
    expect(Arr(1, 2, 3).all()).toEqual([1, 2, 3])
    expect(Arr([1, 2, 3]).all()).toEqual([1, 2, 3])
  })

  it('compact', () => {
    expect(
      Arr([0, null, undefined, 1, false, 2, '', 3, NaN])
        .compact()
        .all()
    ).toEqual([1, 2, 3])
  })

  it('concat', () => {
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

  it('filter', () => {
    expect(
      Arr().filter(value => value > 1).all()
    ).toEqual([])

    expect(
      Arr([1, 2, 3]).filter(value => value > 1).all()
    ).toEqual([2, 3])

    expect(
      Arr([1, 2, 3])
        .filter(value => value > 1)
        .concat(4, 5)
        .all()
    ).toEqual([2, 3, 4, 5])
  })

  it('isEmpty', () => {
    expect(Arr().isEmpty()).toBe(true)
    expect(Arr([]).isEmpty()).toBe(true)

    expect(Arr(1).isEmpty()).toBe(false)
    expect(Arr([1]).isEmpty()).toBe(false)
    expect(Arr([]).concat(1).isEmpty()).toBe(false)
  })

  it('isNotEmpty', () => {
    expect(Arr().isNotEmpty()).toBe(false)
    expect(Arr([]).isNotEmpty()).toBe(false)

    expect(Arr(1).isNotEmpty()).toBe(true)
    expect(Arr([1]).isNotEmpty()).toBe(true)
    expect(Arr([]).concat(1).isNotEmpty()).toBe(true)
  })

  it('size', () => {
    expect(Arr().size()).toEqual(0)
    expect(Arr([]).size()).toEqual(0)

    expect(Arr(1).size()).toEqual(1)
    expect(Arr([1, 2, 3]).size()).toEqual(3)
  })
})
