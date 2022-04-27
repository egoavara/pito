import { pito } from '../cjs/pito.js'
import tap from 'tap'

// === === === === === === === === === === === === //
// literal values
const sLitConst = 'literal string'
const nLitConst = 0xDEADC0DE
const bLitConst = true
const patternConst = '^hello.*'

// === === === === === === === === === === === === //
// typio object
const nul = pito.Nul()
const sLit = pito.Lit(sLitConst)
const nLit = pito.Lit(nLitConst)
const bLit = pito.Lit(bLitConst)
const boo = pito.Bool()
const num = pito.Num()
const str = pito.Str()
const int = pito.Int()
const reg = pito.Regex(patternConst)
// === === === === === === === === === === === === //
// test json schema
tap.test('strict', async t => {
    t.same(
        pito.strict(nul),
        { type: 'null' },
    )

    t.same(
        pito.strict(sLit),
        { const: sLitConst },
    )

    t.same(
        pito.strict(nLit),
        { const: nLitConst },
    )

    t.same(
        pito.strict(bLit),
        { const: bLitConst },
    )

    t.same(
        pito.strict(boo),
        { type: 'boolean' },
    )

    t.same(
        pito.strict(num),
        { type: 'number' },
    )
    t.same(
        pito.strict(str),
        { type: 'string' },
    )
    t.same(
        pito.strict(int),
        { type: 'integer' },
    )
    t.same(
        pito.strict(reg),
        { type: 'string', pattern: patternConst },
    )
})
// === === === === === === === === === === === === //
// test json schema strict with option
tap.test('strict with option', async t => {
    // string option
    t.same(
        pito.strict(pito.Str({ minLength: 1 })),
        { type: 'string', minLength: 1 }
    )
    t.same(
        pito.strict(pito.Str({ maxLength: 2 })),
        { type: 'string', maxLength: 2 }
    )
    // regex option
    t.same(
        pito.strict(pito.Regex(patternConst, { minLength: 1 })),
        { type: 'string', pattern: patternConst, minLength: 1 }
    )
    t.same(
        pito.strict(pito.Regex(patternConst, { maxLength: 2 })),
        { type: 'string', pattern: patternConst, maxLength: 2 }
    )
    // number option
    t.same(
        pito.strict(pito.Num({ multipleOf: 1 })),
        { type: 'number', multipleOf: 1 }
    )
    t.same(
        pito.strict(pito.Num({ minimum: 2 })),
        { type: 'number', minimum: 2 }
    )
    t.same(
        pito.strict(pito.Num({ exclusiveMinimum: 3 })),
        { type: 'number', exclusiveMinimum: 3 }
    )
    t.same(
        pito.strict(pito.Num({ maximum: 4 })),
        { type: 'number', maximum: 4 }
    )
    t.same(
        pito.strict(pito.Num({ exclusiveMaximum: 5 })),
        { type: 'number', exclusiveMaximum: 5 }
    )
    // int option
    t.same(
        pito.strict(pito.Int({ multipleOf: 1 })),
        { type: 'integer', multipleOf: 1 }
    )
    t.same(
        pito.strict(pito.Int({ minimum: 2 })),
        { type: 'integer', minimum: 2 }
    )
    t.same(
        pito.strict(pito.Int({ exclusiveMinimum: 3 })),
        { type: 'integer', exclusiveMinimum: 3 }
    )
    t.same(
        pito.strict(pito.Int({ maximum: 4 })),
        { type: 'integer', maximum: 4 }
    )
    t.same(
        pito.strict(pito.Int({ exclusiveMaximum: 5 })),
        { type: 'integer', exclusiveMaximum: 5 }
    )
})
// === === === === === === === === === === === === //
// wrap
tap.test('wrap', async t => {
    // null
    t.same(
        pito.wrap(nul, null),
        null,
    )
    // string literal
    t.same(
        pito.wrap(sLit, sLitConst),
        sLitConst
    )
    t.notSame(
        pito.wrap(sLit, sLitConst),
        sLitConst + "_"
    )
    // number literal
    t.same(
        pito.wrap(nLit, nLitConst),
        nLitConst
    )
    t.notSame(
        pito.wrap(nLit, nLitConst),
        nLitConst + 1
    )
    // boolean literal
    t.same(
        pito.wrap(bLit, bLitConst),
        bLitConst
    )
    t.notSame(
        pito.wrap(bLit, bLitConst),
        !bLitConst
    )
    // boolean
    t.same(
        pito.wrap(boo, true),
        true
    )
    t.notSame(
        pito.wrap(boo, true),
        false
    )
    // number
    t.same(
        pito.wrap(num, 1),
        1
    )
    t.notSame(
        pito.wrap(num, 1),
        2
    )
    // string
    t.same(
        pito.wrap(str, 'str'),
        'str'
    )
    t.notSame(
        pito.wrap(str, 'str'),
        'not str'
    )
    // 
    t.same(
        pito.wrap(int, 1),
        1,
    )
    t.notSame(
        pito.wrap(int, 1),
        2,
    )
    //
    t.same(
        pito.wrap(reg, 'hello, world'),
        'hello, world',
    )
    t.notSame(
        pito.wrap(reg, 'hello, world'),
        'hello,',
    )
    return
})
// === === === === === === === === === === === === //
// unwrap
tap.test('unwrap', async t => {
    // null
    t.same(
        pito.unwrap(nul, null),
        null,
    )
    // string literal
    t.same(
        pito.unwrap(sLit, sLitConst),
        sLitConst
    )
    t.notSame(
        pito.unwrap(sLit, sLitConst),
        sLitConst + "_"
    )
    // number literal
    t.same(
        pito.unwrap(nLit, nLitConst),
        nLitConst
    )
    t.notSame(
        pito.unwrap(nLit, nLitConst),
        nLitConst + 1
    )
    // boolean literal
    t.same(
        pito.unwrap(bLit, bLitConst),
        bLitConst
    )
    t.notSame(
        pito.unwrap(bLit, bLitConst),
        !bLitConst
    )
    // boolean
    t.same(
        pito.unwrap(boo, true),
        true
    )
    t.notSame(
        pito.unwrap(boo, true),
        false
    )
    // number
    t.same(
        pito.unwrap(num, 1),
        1
    )
    t.notSame(
        pito.unwrap(num, 1),
        2
    )
    // string
    t.same(
        pito.unwrap(str, 'str'),
        'str'
    )
    t.notSame(
        pito.unwrap(str, 'str'),
        'not str'
    )
    // int
    t.same(
        pito.unwrap(int, 1),
        1,
    )
    t.notSame(
        pito.unwrap(int, 1),
        2,
    )
    // regex
    t.same(
        pito.unwrap(reg, 'hello, world'),
        'hello, world',
    )
    t.notSame(
        pito.unwrap(reg, 'hello, world'),
        'hello, ',
    )
    return
})