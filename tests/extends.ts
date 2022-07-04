import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const obj = pito.Extends(
    pito.Obj({
        a: pito.Num(),
        b: pito.Str(),
        c: pito.Opt(pito.Date()),
    }),
    {
        a : pito.Str(),
        d : pito.Int()
    }
)
// === === === === === === === === === === === === //

tap.test('strict', async t => {
    t.same(pito.strict(obj), {
        "type": "object",
        "properties": {
            "a": {
                "type": "string",
            },
            "b": {
                "type": "string",
            },
            "c": {
                "type": "string",
                'format': 'date'
            },
            "d": {
                "type": "integer",
            }
        },
        "required": [
            "a",
            "b",
            "d",
        ],
        "additionalProperties": false,
    })
})


tap.test('wrap', async t => {
    const temp1 = {
        a: 'a',
        b: 'b',
        c: new Date(),
        d : 3
    }
    const temp2 = {
        a: 'a',
        b: 'b',
        d : 3
    }
    t.same(pito.wrap(obj, temp1), {
        ...temp1,
        c : temp1.c.toISOString().substring(0, 10)
    })
    t.same(pito.wrap(obj, temp2), temp2)
})