import { typio } from '../cjs/typio.js'
import tap from 'tap'

// === === === === === === === === === === === === //
// 
const dateConst = "2012-12-12"
const datetimeZConst = "2012-12-12T01:02:03Z"
const datetimeMConst = "2012-12-12T01:02:03-09:00"
const timeZConst = "01:02:03.123Z"
const timeMConst = "01:02:03.123-09:00"
const url = "https://hello.world/foo?bar=1"
// === === === === === === === === === === === === //
typio.date()