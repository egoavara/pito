import { typio } from '../cjs/typio.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const numArr = typio.arr(typio.num())
const booArr = typio.arr(typio.bool())
const dateArr = typio.arr(typio.date())
