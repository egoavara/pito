import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
const obj = pito.Pick(pito.Obj({
    a: pito.Num(),
    b: pito.Num(),
    c: pito.Num(),
}), 'a')
// === === === === === === === === === === === === //

tap.test('strict', async t => {
    t.same(pito.strict(obj), {
        "type": "object",
        "properties": {
            "a": { "type": "number", },
        },
        "required": [
            "a",
        ],
        "additionalProperties": false,
    })
})