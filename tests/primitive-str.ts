import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Str()), { type: 'string' })
    t.same(pito.strict(pito.Str({ minLength : 1 })), { type: 'string', minLength: 1 })
    t.same(pito.strict(pito.Str({ maxLength : 2 })), { type: 'string', maxLength: 2 })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Str(), 'asdfqwer'), 'asdfqwer')
})

tap.test('unwrap', async t => {
    t.same(pito.unwrap(pito.Str(), 'asdfqwer'), 'asdfqwer')
})