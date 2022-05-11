import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Lit('lit')), { const: 'lit' })
    t.same(pito.strict(pito.Lit(1)), { const: 1})
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Lit('lit'), 'lit'), 'lit')
    t.same(pito.wrap(pito.Lit(1), 1), 1)
})

tap.test('unwrap', async t => {
    t.same(pito.unwrap(pito.Lit('lit'), 'lit'), 'lit')
    t.same(pito.unwrap(pito.Lit(1), 1), 1)
})
