import { typio } from '../cjs/typio.js'
import tap from 'tap'

// === === === === === === === === === === === === //
// literal values
const sLitConst = 'literal string'
const nLitConst = 0xDEADC0DE
const bLitConst = true
const patternConst = '^hello.*'

// === === === === === === === === === === === === //
// typio object
const sLit = typio.lit(sLitConst)
const nLit = typio.lit(nLitConst)
const bLit = typio.lit(bLitConst)
const boo = typio.bool()
const num = typio.num()
const str = typio.str()
const int = typio.int()
const reg = typio.regex(patternConst)
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
    t.same(
        typio.strict(int),
        { type: 'integer' },
    )
    t.same(
        typio.strict(reg),
        { type: 'string', pattern: patternConst },
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
    // 
    t.same(
        typio.wrap(int, 1),
        1,
    )
    t.notSame(
        typio.wrap(int, 1),
        2,
    )
    //
    t.same(
        typio.wrap(reg, 'hello, world'),
        'hello, world',
    )
    t.notSame(
        typio.wrap(reg, 'hello, world'),
        'hello,',
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
    // int
    t.same(
        typio.unwrap(int, 1),
        1,
    )
    t.notSame(
        typio.unwrap(int, 1),
        2,
    )
    // regex
    t.same(
        typio.unwrap(reg, 'hello, world'),
        'hello, world',
    )
    t.notSame(
        typio.unwrap(reg, 'hello, world'),
        'hello, ',
    )
    return
})