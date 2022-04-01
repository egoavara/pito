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
enum EBoth {
    A = 'A',
    B = 1,
    C = 'C',
    D = 3,
}

const TEStrOnly = pito.enums(EStrOnly)
const TENumOnly = pito.enums(ENumOnly)
const TEBoth = pito.enums(EBoth)

// === === === === === === === === === === === === //
// typio strict
tap.test('strict', async t => {
    t.same(
        pito.strict(TEStrOnly),
        {
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
            enum: [
                ENumOnly.A,
                ENumOnly.B,
                ENumOnly.C,
                ENumOnly.D,
            ]
        }
    )
    t.same(
        pito.strict(TEBoth),
        {
            enum: [
                EBoth.A,
                EBoth.B,
                EBoth.C,
                EBoth.D,
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
    t.same(
        pito.wrap(TEBoth, EBoth.A),
        EBoth.A
    )
    t.notSame(
        pito.wrap(TEBoth, EBoth.A),
        EBoth.B
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
    t.same(
        pito.unwrap(TEBoth, EBoth.A),
        EBoth.A
    )
    t.notSame(
        pito.unwrap(TEBoth, EBoth.A),
        EBoth.B
    )
})
// === === === === === === === === === === === === //
// unreachable
tap.test('unreachables', async (t) => {
    const a = {
        'A': 1,
        'B': true,
    }
    const ea = pito.enums(a as any)
    t.same(
        pito.strict(ea),
        {
            enum: [1]
        }
    )
})