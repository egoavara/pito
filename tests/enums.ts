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
            anyOf: [
                { const: EStrOnly.A },
                { const: EStrOnly.B },
                { const: EStrOnly.C },
                { const: EStrOnly.D },
            ]
        }
    )
    t.same(
        pito.strict(TENumOnly),
        {
            anyOf: [
                { const: ENumOnly.A },
                { const: ENumOnly.B },
                { const: ENumOnly.C },
                { const: ENumOnly.D },
            ]
        }
    )
    t.same(
        pito.strict(TEBoth),
        {
            anyOf: [
                { const: EBoth.A },
                { const: EBoth.B },
                { const: EBoth.C },
                { const: EBoth.D },
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
            anyOf: [
                { const: 1 }
            ]
        }
    )
})