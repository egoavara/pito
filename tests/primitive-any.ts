import tap from 'tap'
import { pito } from '../cjs/pito.js'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Any()), { type: 'null' })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Any(), null), null)
})

tap.test('unwrap', async t => {
    t.same(pito.wrap(pito.Any(), null), null)
})
