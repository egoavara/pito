import { pito } from '../cjs/pito.js'
import tap from 'tap'


tap.test('strict', async t => {
    t.same(pito.strict(pito.Num()), { type: 'number' })
    t.same(pito.strict(pito.Num({ minimum: 1 })), { type: 'number', minimum: 1 })
    t.same(pito.strict(pito.Num({ exclusiveMinimum: 2 })), { type: 'number', exclusiveMinimum: 2 })
    t.same(pito.strict(pito.Num({ maximum: 3 })), { type: 'number', maximum: 3 })
    t.same(pito.strict(pito.Num({ exclusiveMaximum: 4 })), { type: 'number', exclusiveMaximum: 4 })
    t.same(pito.strict(pito.Num({ multipleOf: 5 })), { type: 'number', multipleOf: 5 })
})

tap.test('wrap', async t => {
    t.same(pito.wrap(pito.Num(), 1), 1)
    t.notSame(pito.wrap(pito.Num(), 1), 2)
})

tap.test('unwrap', async t => {
    t.same(pito.unwrap(pito.Num(), 1), 1)
    t.notSame(pito.unwrap(pito.Num(), 1), 2)
})