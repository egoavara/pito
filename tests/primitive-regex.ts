import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Regex('regex')), { type: 'string', format : 'regex'})
    t.same(pito.strict(pito.Regex('regex', { minLength: 1 })), { type: 'string', format : 'regex', minLength: 1 })
    t.same(pito.strict(pito.Regex('regex', { maxLength: 2 })), { type: 'string', format : 'regex', maxLength: 2 })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Regex('regex'), 'regex'), 'regex')
})

tap.test('unwrap', async t => {
    t.same(pito.unwrap(pito.Regex('regex'), 'regex'), 'regex')
})