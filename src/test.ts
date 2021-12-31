'use strict'

import { Arr } from '.'

const val = Arr(1, 2, 3).filter(item => item > 2).all()

console.log(val)
