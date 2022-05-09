import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const obj = pito.Obj({
    a: pito.Num(),
    b: pito.Str(),
    c: pito.Opt(pito.Date()),
})
// === === === === === === === === === === === === //

tap.test('strict', async t => {
    t.same(pito.strict(obj), {
        "type": "object",
        "properties": {
            "a": {
                "type": "number",
            },
            "b": {
                "type": "string",
            },
            "c": {
                "type": "string",
                'format': 'date'
            },
        },
        "required": [
            "a",
            "b",
        ],
        "additionalProperties": false,
    })
})


tap.test('wrap', async t => {
    const temp1 = {
        a: 1,
        b: 'b',
        c: new Date()
    }
    const temp2 = {
        a: 1,
        b: 'b',
    }
    t.same(pito.wrap(obj, temp1), temp1)
    t.same(pito.wrap(obj, temp2), temp2)
})