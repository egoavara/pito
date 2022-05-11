import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Bool()), { type: 'boolean' })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Bool(), false), false)
})

tap.test('unwrap', async t => {
    t.same(pito.unwrap(pito.Bool(), true), true)
})