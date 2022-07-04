import tap from 'tap'
import { pito } from '../cjs/pito.js'

enum EStrOnly {
    A = 'A',
    B = 'B',
    C = 'C',
    D = 'D',
}
enum ENumOnly {
    A = 0,
    B = 1,
    C = 2,
    D = 3,
}

const TEStrOnly = pito.Enums(EStrOnly)
const TENumOnly = pito.Enums(ENumOnly)

// === === === === === === === === === === === === //
// typio strict
tap.test('strict', async t => {
    t.same(
        pito.strict(TEStrOnly),
        {
            type: 'string',
            enum: [
                EStrOnly.A,
                EStrOnly.B,
                EStrOnly.C,
                EStrOnly.D,
            ]
        }
    )
    t.same(
        pito.strict(TENumOnly),
        {
            type: 'number',
            enum: [
                ENumOnly.A,
                ENumOnly.B,
                ENumOnly.C,
                ENumOnly.D,
            ]
        }
    )
})
// === === === === === === === === === === === === //
// typio wrap
tap.test('wrap', async t => {
    t.same(
        pito.wrap(TEStrOnly, EStrOnly.A),
        EStrOnly.A
    )
    t.notSame(
        pito.wrap(TEStrOnly, EStrOnly.A),
        EStrOnly.B
    )
    t.same(
        pito.wrap(TENumOnly, ENumOnly.A),
        ENumOnly.A
    )
    t.notSame(
        pito.wrap(TENumOnly, ENumOnly.A),
        ENumOnly.B
    )
})
// === === === === === === === === === === === === //
// typio unwrap
tap.test('unwrap', async t => {
    t.same(
        pito.unwrap(TEStrOnly, EStrOnly.A),
        EStrOnly.A
    )
    t.notSame(
        pito.unwrap(TEStrOnly, EStrOnly.A),
        EStrOnly.B
    )
    t.same(
        pito.unwrap(TENumOnly, ENumOnly.A),
        ENumOnly.A
    )
    t.notSame(
        pito.unwrap(TENumOnly, ENumOnly.A),
        ENumOnly.B
    )
})
// === === === === === === === === === === === === //
// unreachable
tap.test('unreachables', async (t) => {
    t.throws(()=>{

        const a = {
            'A': 1,
            'B': true,
        }
        const ea = pito.Enums(a as any)
    })
})