import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const obj = pito.Omit(pito.Obj({
    a: pito.Num(),
    b: pito.Num(),
    c: pito.Num(),
}), 'a')
// === === === === === === === === === === === === //

tap.test('strict', async t => {
    t.same(pito.strict(obj), {
        "type": "object",
        "properties": {
            "b": { "type": "number", },
            "c": { "type": "number", },
        },
        "required": [
            "b",
            "c",
        ],
        "additionalProperties": false,
    })
})