import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(
        pito.strict(pito.Obj({ a: pito.Num(), b: pito.Str(), c: pito.Opt(pito.Int()) })),
        {
            type: 'object',
            properties: {
                a: { type: 'number' },
                b: { type: 'string' },
                c: { type: 'integer' },
            },
            required: ["a", "b"],
            additionalProperties: false
        }
    )
    t.same(
        pito.strict(pito.Obj({ a: pito.Num(), b: pito.Str(), c: pito.Opt(pito.Int()) }, {additionalProperties : true})),
        {
            type: 'object',
            properties: {
                a: { type: 'number' },
                b: { type: 'string' },
                c: { type: 'integer' },
            },
            required: ["a", "b"],
        }
    )
})

tap.test('wrap', async t => {
    t.same(
        pito.wrap(
            pito.Obj({ a: pito.Num(), b: pito.Str(), c: pito.Opt(pito.Int()) }),
            { a: 1, b: "b", c: 1, }
        ),
        { a: 1, b: "b", c: 1, }
    )
    t.same(
        pito.wrap(
            pito.Obj({ a: pito.Num(), b: pito.Str(), c: pito.Opt(pito.Int()) }, { additionalProperties: true }),
            { a: 1, b: "b", c: 1, d: 1, }
        ),
        { a: 1, b: "b", c: 1, d: 1, }
    )
})

// tap.test('unwrap', async t => {
//     t.same(
//         pito.unwrap(
//             pito.Obj({ a: pito.Num(), b: pito.Str(), c: pito.Opt(pito.Int()) }),
//             { a: 1, b: "b", c: 1, }
//         ),
//         { a: 1, b: "b", c: 1, }
//     )
//     t.same(
//         pito.unwrap(
//             pito.Obj({ a: pito.Num(), b: pito.Str(), c: pito.Opt(pito.Int()) }, { additionalProperties: true }),
//             { a: 1, b: "b", c: 1, d: 1, }
//         ),
//         { a: 1, b: "b", c: 1, d: 1, }
//     )
// })