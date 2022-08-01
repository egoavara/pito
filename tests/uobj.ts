import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const uObjNormal = pito.Uobj('type')
    .case(
        'foo', ({
            a: pito.Num()
        })
    )
    .case(
        'bar', ({
            b: pito.Date()
        })
    )
    .end()
// === === === === === === === === === === === === //

tap.test('strict', async t => {
    t.same(pito.strict(uObjNormal), {

        "discriminator": { "propertyName": "type" },
        "oneOf": [
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
})