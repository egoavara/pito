import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const numArr = pito.Arr(pito.Num())
const dateArr = pito.Arr(pito.Date())
const anyObj = pito.Obj({
    a: pito.Bool(),
    b: pito.Date(),
    c: numArr,
    d: pito.Opt(pito.Date()),
})
const uObj = pito.Uobj(
    'type',
    {
        foo: pito.Obj({
            a: pito.Num()
        }),
        bar: pito.Obj({
            b: pito.Date()
        }),
    })

// === === === === === === === === === === === === //
// pito strict
tap.test('strict', async t => {
    t.same(
        pito.strict(numArr),
        { type: 'array', items: { type: 'number' } }
    )
    t.same(
        pito.strict(dateArr),
        { type: 'array', items: { type: 'string', format: 'date' } }
    )
    t.same(
        pito.strict(anyObj),
        {
            type: 'object',
            properties: {
                a: { type: 'boolean' },
                b: { type: 'string', format: 'date' },
                c: { type: 'array', items: { type: 'number' } },
                d: { type: 'string', format: 'date' },
            },
            required: [
                "a", "b", "c"
            ],
            additionalProperties: false
        }
    )
    t.same(
        pito.strict(uObj),
        {
            anyOf: [
                {
                    type: 'object',
                    properties: {
                        type: { const: 'foo' },
                        a: { type: 'number' },
                    },
                    required: [
                        "a", "type"
                    ],
                    additionalProperties: false
                },
                {
                    type: 'object',
                    properties: {
                        type: { const: 'bar' },
                        b: { type: 'string', format: 'date' },
                    },
                    required: [
                        "b", "type"
                    ],
                    additionalProperties: false
                },
            ],
        }
    )
})
// === === === === === === === === === === === === //
// pito wrap
tap.test('wrap', async t => {
    t.same(
        pito.wrap(numArr, [1, 2, 3, 4]),
        [1, 2, 3, 4],
    )
    t.same(
        pito.wrap(dateArr, [new Date("2012-11-13"), new Date("2015-01-01"),]),
        ["2012-11-13", "2015-01-01"]
    )
    t.same(
        pito.wrap(anyObj, {
            a: true,
            b: new Date("2012-11-13"),
            c: [1, 2, 3, 4],
            d: new Date("2015-01-01"),
        }),
        {
            a: true,
            b: "2012-11-13",
            c: [1, 2, 3, 4],
            d: '2015-01-01',
        }
    )
    t.same(
        pito.wrap(uObj, {
            type: 'foo',
            a: 1,
        }),
        {
            type: 'foo',
            a: 1,
        }
    )
    t.same(
        pito.wrap(uObj, {
            type: 'bar',
            b: new Date("2012-10-11"),
        }),
        {
            type: 'bar',
            b: "2012-10-11",
        }
    )
})
// === === === === === === === === === === === === //
// pito unwrap
tap.test('unwrap', async t => {
    t.same(
        pito.unwrap(numArr, [1, 2, 3, 4]),
        [1, 2, 3, 4],
    )
    t.same(
        pito.unwrap(dateArr, ["2012-11-13", "2015-01-01"]),
        [new Date("2012-11-13"), new Date("2015-01-01"),]
    )
    t.same(
        pito.unwrap(anyObj, {
            a: true,
            b: "2012-11-13",
            c: [1, 2, 3, 4],
            d: '2015-01-01',
        }),
        {
            a: true,
            b: new Date("2012-11-13"),
            c: [1, 2, 3, 4],
            d: new Date("2015-01-01"),
        }
    )
    t.same(
        pito.unwrap(uObj, {
            type: 'foo',
            a: 1,
        }),
        {
            type: 'foo',
            a: 1,
        }
    )
    t.same(
        pito.unwrap(uObj, {
            type: 'bar',
            b: "2012-10-11",
        }),
        {
            type: 'bar',
            b: new Date("2012-10-11"),
        }
    )
})