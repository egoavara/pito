import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Int()), { type: 'integer' })
    t.same(pito.strict(pito.Int({ minimum: 1 })), { type: 'integer', minimum: 1 })
    t.same(pito.strict(pito.Int({ exclusiveMinimum: 2 })), { type: 'integer', exclusiveMinimum: 2 })
    t.same(pito.strict(pito.Int({ maximum: 3 })), { type: 'integer', maximum: 3 })
    t.same(pito.strict(pito.Int({ exclusiveMaximum: 4 })), { type: 'integer', exclusiveMaximum: 4 })
    t.same(pito.strict(pito.Int({ multipleOf: 5 })), { type: 'integer', multipleOf: 5 })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Int(), 1), 1)
    t.notSame(pito.wrap(pito.Int(), 1), 2)
})

tap.test('unwrap', async t => {
    t.same(pito.unwrap(pito.Int(), 1), 1)
    t.notSame(pito.unwrap(pito.Int(), 1), 2)
})