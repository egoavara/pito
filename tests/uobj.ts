import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const uObjNormal = pito.Uobj('type')
    .case(
        'foo', pito.Obj({
            a: pito.Num()
        })
    )
    .case(
        'bar', pito.Obj({
            b: pito.Date()
        })
    )
    .end()
const uObjNumKey = pito.Uobj('type')
    .case(
        1, pito.Obj({
            a: pito.Num()
        })
    )
    .case(
        2, pito.Obj({
            b: pito.Date()
        })
    )
    .end()
// === === === === === === === === === === === === //

tap.test('strict', async t => {
    t.same(pito.strict(uObjNormal), {
        "anyOf": [
            {
                "type": "object",
                "properties": {
                    "a": {
                        "type": "number",
                    },
                    "type": {
                        "const": "foo",
                    },
                },
                "required": [
                    "a",
                    "type",
                ],
                "additionalProperties": false,
            },
            {
                "type": "object",
                "properties": {
                    "b": {
                        "type": "string",
                        "format": "date",
                    },
                    "type": {
                        "const": "bar",
                    },
                },
                "required": [
                    "b",
                    "type",
                ],
                "additionalProperties": false,
            },
        ],

    })
    t.same(pito.strict(uObjNumKey), {
        "anyOf": [
            {
                "type": "object",
                "properties": {
                    "a": {
                        "type": "number",
                    },
                    "type": {
                        "const": 1,
                    },
                },
                "required": [
                    "a",
                    "type",
                ],
                "additionalProperties": false,
            },
            {
                "type": "object",
                "properties": {
                    "b": {
                        "type": "string",
                        "format": "date",
                    },
                    "type": {
                        "const": 2,
                    },
                },
                "required": [
                    "b",
                    "type",
                ],
                "additionalProperties": false,
            },
        ],
    })
})


tap.test('wrap', async t => {

    t.same(
        pito.wrap(uObjNormal, {

            type: 'foo',
            a: 1,
        }),
        {
            type: 'foo',
            a: 1,
        }
    )
    t.same(
        pito.wrap(uObjNormal, {
            type: 'bar',
            b: new Date("2012-10-11"),
        }),
        {
            type: 'bar',
            b: "2012-10-11",
        }
    )
    t.same(
        pito.wrap(uObjNumKey, {

            type: 1,
            a: 1,
        }),
        {
            type: 1,
            a: 1,
        }
    )
    t.same(
        pito.wrap(uObjNumKey, {
            type: 2,
            b: new Date("2012-10-11"),
        }),
        {
            type: 2,
            b: "2012-10-11",
        }
    )
})