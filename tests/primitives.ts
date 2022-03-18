import { typio } from '../cjs/typio.js'
import tap from 'tap'

// === === === === === === === === === === === === //
// literal values
const sLitConst = 'literal string'
const nLitConst = 0xDEADC0DE
const bLitConst = true

// === === === === === === === === === === === === //
// typio object
const sLit = typio.lit(sLitConst)
const nLit = typio.lit(nLitConst)
const bLit = typio.lit(bLitConst)
const boo = typio.bool()
const num = typio.num()
const str = typio.str()
// === === === === === === === === === === === === //
// test json schema
tap.test('strict', async t => {
    t.same(
        typio.strict(sLit),
        { const: sLitConst },
    )

    t.same(
        typio.strict(nLit),
        { const: nLitConst },
    )

    t.same(
        typio.strict(bLit),
        { const: bLitConst },
    )

    t.same(
        typio.strict(boo),
        { type: 'boolean' },
    )

    t.same(
        typio.strict(num),
        { type: 'number' },
    )
    t.same(
        typio.strict(str),
        { type: 'string' },
    )
})
// === === === === === === === === === === === === //
// wrap
tap.test('wrap', async t => {
    // string literal
    t.same(
        typio.wrap(sLit, sLitConst),
        sLitConst
    )
    t.notSame(
        typio.wrap(sLit, sLitConst),
        sLitConst + "_"
    )
    // number literal
    t.same(
        typio.wrap(nLit, nLitConst),
        nLitConst
    )
    t.notSame(
        typio.wrap(nLit, nLitConst),
        nLitConst + 1
    )
    // boolean literal
    t.same(
        typio.wrap(bLit, bLitConst),
        bLitConst
    )
    t.notSame(
        typio.wrap(bLit, bLitConst),
        !bLitConst
    )
    // boolean
    t.same(
        typio.wrap(boo, true),
        true
    )
    t.notSame(
        typio.wrap(boo, true),
        false
    )
    // number
    t.same(
        typio.wrap(num, 1),
        1
    )
    t.notSame(
        typio.wrap(num, 1),
        2
    )
    // string
    t.same(
        typio.wrap(str, 'str'),
        'str'
    )
    t.notSame(
        typio.wrap(str, 'str'),
        'not str'
    )
    return
})
tap.test('unwrap', async t => {
    // string literal
    t.same(
        typio.unwrap(sLit, sLitConst),
        sLitConst
    )
    t.notSame(
        typio.unwrap(sLit, sLitConst),
        sLitConst + "_"
    )
    // number literal
    t.same(
        typio.unwrap(nLit, nLitConst),
        nLitConst
    )
    t.notSame(
        typio.unwrap(nLit, nLitConst),
        nLitConst + 1
    )
    // boolean literal
    t.same(
        typio.unwrap(bLit, bLitConst),
        bLitConst
    )
    t.notSame(
        typio.unwrap(bLit, bLitConst),
        !bLitConst
    )
    // boolean
    t.same(
        typio.unwrap(boo, true),
        true
    )
    t.notSame(
        typio.unwrap(boo, true),
        false
    )
    // number
    t.same(
        typio.unwrap(num, 1),
        1
    )
    t.notSame(
        typio.unwrap(num, 1),
        2
    )
    // string
    t.same(
        typio.unwrap(str, 'str'),
        'str'
    )
    t.notSame(
        typio.unwrap(str, 'str'),
        'not str'
    )
    return
})