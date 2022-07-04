import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
// 
const _date_Const = "2012-12-12"
const _date_Date = new Date(_date_Const)
const _datetime_Const = "2012-12-12T01:02:03.000Z"
const _datetime_Date = new Date(_datetime_Const)
const _url_Const = "https://hello.world/foo?bar=1"
const _url_URL = new URL(_url_Const)
// === === === === === === === === === === === === //
const date = pito.Date()
const datetime = pito.Datetime()
const url = pito.Url()
// 
// === === === === === === === === === === === === //
// test json schema
tap.test('strict', async t => {
    t.same(
        pito.strict(date),
        { type: 'string', format: 'date' },
    )
    t.same(
        pito.strict(datetime),
        { type: 'string', format: 'date-time' },
    )
    t.same(
        pito.strict(url),
        { type: 'string', format: 'url' },
    )
})
// === === === === === === === === === === === === //
// test wrap
tap.test('wrap', async t => {
    // date
    t.same(
        pito.wrap(date, _date_Date),
        _date_Const
    )
    t.notSame(
        pito.wrap(date, _date_Date),
        _date_Const + "1"
    )
    // date-time
    t.same(
        pito.wrap(datetime, _datetime_Date),
        _datetime_Const
    )
    t.notSame(
        pito.wrap(datetime, _datetime_Date),
        _datetime_Const + "1"
    )
    // url
    t.same(
        pito.wrap(url, _url_URL),
        _url_Const
    )
    t.notSame(
        pito.wrap(url, _url_URL),
        _url_Const + "1"
    )
})
// === === === === === === === === === === === === //
// test unwrap
// test wrap
tap.test('unwrap', async t => {
    // date
    t.same(
        pito.unwrap(date, _date_Const),
        _date_Date
    )
    // date-time
    t.same(
        pito.unwrap(datetime, _datetime_Const),
        _datetime_Date
    )
    // url
    t.same(
        pito.unwrap(url, _url_Const),
        _url_URL
    )
})