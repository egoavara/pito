import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Nul()), { type: 'null' })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Nul(), null), null)
})

tap.test('unwrap', async t => {
    t.same(pito.wrap(pito.Nul(), null), null)
})
